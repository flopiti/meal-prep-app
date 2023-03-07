
import React from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'

const Calendar = () => {
  let datesToCover=['2023-03-08', '2023-03-09', '2023-03-10', '2023-03-11' ];
  return (
          <div className={styles.calendar}>
            {
                datesToCover.map((day) => {
                    return <Day day={day}/>
                })
            }
          </div>          
  )
}  

export default Calendar;
