
import React from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'
import { useScheduledMeals } from '@/hooks/useScheduledMeals';

const Calendar = ({scheduledMeals}:any) => {
  let datesToCover=['2023-03-08', '2023-03-09', '2023-03-10', '2023-03-11' ];


  return (
          <div className={styles.calendar}>
            {
                datesToCover.map((day) => {
                    return <Day day={day} meals={scheduledMeals.filter((meal:any) => meal.date === day)}/>
                })
            }
          </div>          
  )
}  

export default Calendar;
