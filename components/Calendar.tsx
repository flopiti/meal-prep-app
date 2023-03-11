
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'

const Calendar = ({scheduledMeals, scheduleMeal, removeMeal, addMealToScheduledMeal}:any) => {

  const [isMobile, setIsMobile] = useState(false);
  const [datesToCover, setDatesToCover ]= useState(getDateStrings(new Date));

  useEffect(() => {
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

  return (
    <div>
      <div className={styles.dayArrows}>
          <button className={styles.xbutton} onClick={pushOneDateBack}>
                    BACK
          </button>
          <button className={styles.xbutton} onClick={pushOneDateForward}>
                    NEXT
          </button>
      </div>
      <div className={styles.calendar}>
      {
        isMobile ? <Day
        key={datesToCover[0]}
        scheduleMeal={scheduleMeal}
        day={datesToCover[0]}
        meals={scheduledMeals.filter((meal: any) => meal.date === datesToCover[0])}
        removeMeal={removeMeal}
        addMealToScheduledMeal={addMealToScheduledMeal}
      /> : 
        datesToCover.map((day, index) => {
          return <Day key={index} scheduleMeal={scheduleMeal} day={day} meals={scheduledMeals.filter((meal:any) => meal.date === day)} removeMeal={removeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
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
