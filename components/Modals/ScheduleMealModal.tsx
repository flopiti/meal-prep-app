import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useScheduledMeals } from "@/hooks/useScheduledMeals";
import { useMealContext } from "@/providers/MealContext";
import { scheduleMeal } from "@/providers/ScheduledMealSlice";
import styles from "@/styles/ScheduleMealModal.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const ScheduleMealModal = ({ closeForm, day, mealType }: any) => {
  const dispatch = useAppDispatch();
  const { meals } = useMealContext();
  const { postScheduledMeal } = useScheduledMeals();
  const { t } = useTranslation("common");
  const stopScrolling = () => {
    clearInterval(scrollInterval);
  };
  const mealsRef = useRef<any>(null);
  const [scrollInterval, setScrollInterval] = useState<any>(null);
  const startScrolling = (direction: any) => {
    setScrollInterval(
      setInterval(() => {
        if (direction === "left") {
          mealsRef.current.scrollLeft -= 5;
        } else {
          mealsRef.current.scrollLeft += 5;
        }
      }, 20),
    );
  };
  return (
    <div className={styles.box}>
      <div
        className={`${styles.hoverArea} ${styles.left}`}
        onMouseOver={() => startScrolling("left")}
        onMouseOut={stopScrolling}
      />
      <div
        className={`${styles.hoverArea} ${styles.right}`}
        onMouseOver={() => startScrolling("right")}
        onMouseOut={stopScrolling}
      />
      <div className={styles.header}>
        <h2>{t("hungry")}</h2>
      </div>
      <div ref={mealsRef} className={styles.meals}>
        {meals.map((meal: any) => {
          return (
            <div className={styles.meal}>
              <button
                onClick={() => {
                  postScheduledMeal(day, mealType, meal.id).then((res: any) => {
                    dispatch(
                      scheduleMeal({
                        id: res.id,
                        date: res.date,
                        mealType: res.mealType,
                        mealId: meal.id,
                      }),
                    );
                    closeForm();
                  });
                }}
                className={styles.mealButton}
              >
                <Image src={meal.iconUrl} alt={""} width={125} height={125} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleMealModal;
