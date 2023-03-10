
import React from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'

const Calendar = ({scheduledMeals, scheduleMeal, removeMeal, addMealToScheduledMeal}:any) => {

  const datesToCover = getDateStrings();
  return (
          <div className={styles.calendar}>
            {
                datesToCover.map((day, index) => {
                    return <Day key={index} scheduleMeal={scheduleMeal} day={day} meals={scheduledMeals.filter((meal:any) => meal.date === day)} removeMeal={removeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
                })
            }
          </div>          
  )
}  

export default Calendar;

export const getDateStrings = () => {
  const today = new Date();
  const dateStrings = [];
  for (let i = 0; i < 4; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().slice(0, 10);
    dateStrings.push(dateString);
  }
  return dateStrings;
}
