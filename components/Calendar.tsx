
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'
import useSwipe from '@/hooks/useSwipe';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import { useScheduledMealContext } from '@/providers/ScheduledMealContext';
import { useMealContext } from '@/providers/MealContext';
import { useMeals } from '@/hooks/useMeals';
import axios from 'axios';
import useSWR from 'swr';

const Calendar = ({}:any) => {

  const [isMobile, setIsMobile] = useState(false);
  const [datesToCover, setDatesToCover ]= useState(getDateStrings(new Date));

  const fetcher = (url:string) => axios.get(url).then(res => res.data)

  const {data : scheduledMeals, error: scheduledMealsError } = useSWR('/api/scheduled-meals', fetcher)

  const { setScheduledMeals } = useScheduledMealContext();
  const { getMeals } = useMeals();
  const { setMeals } = useMealContext();

  useEffect(() => {
    if (scheduledMeals) {
      setScheduledMeals(scheduledMeals);
    }
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
    getMeals().then((data:any) => setMeals(data))
  }, [scheduledMeals]);
  const handleSwipe = (direction: any) => {
    if (direction === 'left') {
      pushOneDateForward();
    } else if (direction === 'right') {
      pushOneDateBack();
    }
  };
  useSwipe(handleSwipe);


  if (scheduledMealsError) return <div>Failed to load scheduled</div>

  if(!scheduledMeals){
    return <div>Loading...</div>
  }
  const pushOneDateForward = () => {
    const newDate = new Date(datesToCover[1]);
    setDatesToCover(getDateStrings(newDate));
  }

  const pushOneDateBack = () => {
    const newDate = (new Date(datesToCover[0]));
    newDate.setDate(newDate.getDate() - 1);
    setDatesToCover(getDateStrings(new Date(newDate)));
  }


  
  return (
    <div>
      <div className={styles.dayArrows}>
          <motion.button
            whileTap={{ x: -5 }}
            className={styles.xbutton} 
            onClick={pushOneDateBack}>
            <Image src={'arrow.svg'} alt={''} width={40} height={20}/>
          </motion.button>
          <motion.button 
            className={styles.xbutton} 
            onClick={pushOneDateForward}
            whileTap={{ x: 5 }}
            >
            <Image src={'arrow.svg'} alt={''} width={40} height={20} 
            style={{transform: 'rotate(180deg)'}}
            />
          </motion.button>
      </div>
      <div className={styles.calendar}>
      {
        isMobile ? <Day
        key={datesToCover[0]}
        date={datesToCover[0]}
      /> : 
        datesToCover.map((day, index) => {
          return <Day key={index} date={day}/>
        })
      }
      </div>
    </div>
  )
}  

export default Calendar;

export const getDateStrings = (mainDate: Date) => {
  const dateStrings = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date(mainDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().slice(0, 10);
    dateStrings.push(dateString);
  }
  return dateStrings;
}
