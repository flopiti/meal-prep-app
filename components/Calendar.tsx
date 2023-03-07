
import React from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'

const Calendar = ({scheduledMeals, scheduleMeal, removeMeal}:any) => {
  let datesToCover=['2023-03-08', '2023-03-09', '2023-03-10', '2023-03-11' ];

  return (
          <div className={styles.calendar}>
            {
                datesToCover.map((day, index) => {
                    return <Day key={index} scheduleMeal={scheduleMeal} day={day} meals={scheduledMeals.filter((meal:any) => meal.date === day)} removeMeal={removeMeal}/>
                })
            }
          </div>          
  )
}  

export default Calendar;
