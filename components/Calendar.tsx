
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'
import useSwipe from '@/hooks/useSwipe';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import { useScheduledMealContext } from '@/providers/ScheduledMealContext';

const Calendar = ({}:any) => {

  const [isMobile, setIsMobile] = useState(false);
  const [datesToCover, setDatesToCover ]= useState(getDateStrings(new Date));

  const { getScheduledMeals } = useScheduledMeals();
  const { setScheduledMeals } = useScheduledMealContext();

  useEffect(() => {
    getScheduledMeals().then((data:any) => setScheduledMeals(data))
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const pushOneDateForward = () => {
    const newDate = new Date(datesToCover[1]);
    setDatesToCover(getDateStrings(newDate));
  }

  const pushOneDateBack = () => {
    const newDate = (new Date(datesToCover[0]));
    newDate.setDate(newDate.getDate() - 1);
    setDatesToCover(getDateStrings(new Date(newDate)));
  }

  const handleSwipe = (direction: any) => {
    if (direction === 'left') {
      pushOneDateForward();
    } else if (direction === 'right') {
      pushOneDateBack();
    }
  };
  useSwipe(handleSwipe);
  
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
        day={datesToCover[0]}
      /> : 
        datesToCover.map((day, index) => {
          return <Day key={index} day={day}/>
        })
      }
      </div>
    </div>
  )
}  

export default Calendar;

export const getDateStrings = (mainDate: Date) => {
  const dateStrings = [];
  for (let i = 0; i < 4; i++) {
    const date = new Date(mainDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().slice(0, 10);
    dateStrings.push(dateString);
  }
  return dateStrings;
}
