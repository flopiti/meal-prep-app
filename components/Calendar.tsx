
import React from 'react'
import styles from '@/styles/Home.module.css'
import Day from '@/components/Day'
import { useScheduledMeals } from '@/hooks/useScheduledMeals';

const Calendar = () => {
  let datesToCover=['2023-03-08', '2023-03-09', '2023-03-10', '2023-03-11' ];
  const { getScheduledMeals } = useScheduledMeals();
  const[meals, setMeals] = React.useState<any>([]);

  React.useEffect(() => {
  getScheduledMeals().then((data:any) => {
      setMeals(data);
  });
  }, []);

  return (
          <div className={styles.calendar}>
            {
                datesToCover.map((day) => {
                    return <Day day={day} meals={meals.filter((meal:any) => meal.date === day)}/>
                })
            }
          </div>          
  )
}  

export default Calendar;
