import styles from '@/styles/Home.module.css';
import ScheduledMeal from './ScheduledMeal';
import { useState } from 'react';

const Day = ({ day, meals , scheduleMeal, removeMeal, addMealToScheduledMeal, changeMeal} :any) => {
    let mealTypes = ['breakfast', 'lunch', 'dinner'];
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);
    const tomorrow = new Date(today);
    const mealsShown = 0;
    tomorrow.setDate(today.getDate() + 1);
    const dateStringTomorrow = tomorrow.toISOString().slice(0, 10);
    const [elements, setElements] =useState<React.ReactNode[]>([]);
    
    const addMeal = () => {
        if (elements.length < 3) {
          const newElement = <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[elements.length]) ? meals.find((meal:any) => meal.mealType === mealTypes[elements.length]) : null} mealType={mealTypes[elements.length]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
          setElements(prevElements => [...prevElements, newElement]);
        }
        
    };
    return (
        <div
        className={styles.day}>
            <div>
                <h1 className={styles.dayTitle}>{dateString===day ? 'Today' : dateStringTomorrow===day ? 'Tomorrow' : '' }</h1>
                {day}
            </div>
            <div>
                {elements.map((element, index) => (
                    <div key={index} className="element">{element}</div>
                ))}
                {elements.length < 3 && (
                    <button onClick={addMeal} disabled={elements.length === 3} >+</button>
                )}
               
            </div>
           
            </div>
    );
    };

export default Day;