
import React from 'react'
import styles from '@/styles/Home.module.css'

const Calendar = () => {
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  return (
          <div className={styles.calendar}>
            {
                days.map((day) => {
                    return <div className={styles.day}>{day}</div>
                })
            
            }

          </div>          
  )
}  

export default Calendar;
