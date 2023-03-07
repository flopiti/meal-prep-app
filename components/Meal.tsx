import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export type Meal = {
    date: string;
    mealType: string;
    mealName: string;
};

const Meal = ({ meal, mealType , scheduleMeal, day} :any) => {
    const[mealChoice, setMealChoice] = useState<string | null>(meal);
    const { postScheduledMeal } = useScheduledMeals();
    const handleDrop = (data:any) => {
        postScheduledMeal(data, day, mealType);
        // setMealChoice(data)
        scheduleMeal(data, day, mealType);
      };

      useEffect(() => {setMealChoice(meal);}, [meal])
    return (
        <div className={styles.meal}>
            <div>{mealType}</div>
            {
                mealChoice ? (
                    <div className={styles.mealChoice}>
                        {mealChoice }
                    </div>
                ) : (
                    <DropZone onDrop={handleDrop}>
                        Drop here
                    </DropZone>
                )
            }
        </div>
    );
};

export default Meal;



function DropZone(props:any) {
    const handleDrop = (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text/plain');
      props.onDrop(data);
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    return (
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={styles.mealChoice}      >
        {props.children}
      </div>
    );
  }