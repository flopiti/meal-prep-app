import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Day from "@/components/Day";
import useSwipe from "@/hooks/useSwipe";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMealContext } from "@/providers/MealContext";
import { useMeals } from "@/hooks/useMeals";
import axios from "axios";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setScheduledMeals } from "@/providers/ScheduledMealSlice";

const Calendar: React.FC = () => {
  const getDateStrings = (mainDate: Date) => {
    const dateStrings = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(mainDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().slice(0, 10);
      dateStrings.push(dateString);
    }
    return dateStrings;
  };

  const dispatch = useAppDispatch();
  const scheduledMeals = useAppSelector((state) => state.scheduledMeals);

  const [isMobile, setIsMobile] = useState(false);
  const [datesToCover, setDatesToCover] = useState(getDateStrings(new Date()));
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data: scheduledMealsData, error: scheduledMealsError } = useSWR(
    "/api/scheduled-meals",
    fetcher,
  );
  const { getMeals } = useMeals();
  const { setMeals } = useMealContext();
  const handleSwipe = (direction: string) => {
    if (direction === "left") {
      pushOneDateForward();
    } else if (direction === "right") {
      pushOneDateBack();
    }
  };
  useSwipe(handleSwipe);
  useEffect(() => {
    if (scheduledMeals) {
      dispatch(setScheduledMeals(scheduledMealsData));
    }
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
    getMeals().then((data: any) => setMeals(data));
  }, [scheduledMealsData]);

  const pushOneDateForward = () => {
    const newDate = new Date(datesToCover[1]);
    setDatesToCover(getDateStrings(newDate));
  };

  const pushOneDateBack = () => {
    const newDate = new Date(datesToCover[0]);
    newDate.setDate(newDate.getDate() - 1);
    setDatesToCover(getDateStrings(new Date(newDate)));
  };

  if (scheduledMealsError) return <div>Failed to load scheduled</div>;
  return (
    <div id="calendar">
      <div id="calendar-control-arrows" className={styles.dayArrows}>
        <motion.button
          whileTap={{ x: -5 }}
          className={styles.xbutton}
          onClick={pushOneDateBack}
        >
          <Image src={"arrow.svg"} alt={""} width={40} height={20} />
        </motion.button>
        <motion.button
          className={styles.xbutton}
          onClick={pushOneDateForward}
          whileTap={{ x: 5 }}
        >
          <Image
            src={"arrow.svg"}
            alt={""}
            width={40}
            height={20}
            style={{ transform: "rotate(180deg)" }}
          />
        </motion.button>
      </div>
      <div id="calendar-days" className={styles.calendar}>
        {isMobile ? (
          <Day key={datesToCover[0]} date={datesToCover[0]} />
        ) : (
          datesToCover.map((day: string, index: number) => {
            return <Day key={index} date={day} loading={!scheduledMeals} />;
          })
        )}
      </div>
    </div>
  );
};

export default Calendar;
