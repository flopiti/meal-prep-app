
import React from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'

const Calendar = () => {
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  return (
          <div className={styles.calendar}>
            {
                days.map((day) => {
                    return <Day day={day}/>
                })
            
            }
          </div>          
  )
}  

export default Calendar;
