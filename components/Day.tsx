import styles from '@/styles/Home.module.css';
import ScheduledMeal from './ScheduledMeal';
import { useState } from 'react';

const Day = ({ day, meals , scheduleMeal, removeMeal, addMealToScheduledMeal, changeMeal} :any) => {
    let mealTypes = ['breakfast', 'lunch', 'dinner'];
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);
    const tomorrow = new Date(today);
    const [counter, setCounter] = useState(0);
    tomorrow.setDate(today.getDate() + 1);
    const dateStringTomorrow = tomorrow.toISOString().slice(0, 10);
    
    function addMeal() {
        if (counter < 3) {
            setCounter(prevCounter => prevCounter + 1);
        }
    }
    return (
        <div
        className={styles.day}>
            <div>
                <h1 className={styles.dayTitle}>{dateString===day ? 'Today' : dateStringTomorrow===day ? 'Tomorrow' : '' }</h1>
                {day}
            </div>
            <div>
                {counter > 0 && (
                    <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[0]) ? meals.find((meal:any) => meal.mealType === mealTypes[0]) : null} mealType={mealTypes[0]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
                )}
                {counter > 1 && (
                    <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[1]) ? meals.find((meal:any) => meal.mealType === mealTypes[1]) : null} mealType={mealTypes[1]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
                )}
                {counter > 2 && (
                    <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[2]) ? meals.find((meal:any) => meal.mealType === mealTypes[2]) : null} mealType={mealTypes[2]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
                )}
                {counter < 3 && (
                    <button onClick={addMeal} >+</button>
                )}
               
            </div>
           
            </div>
        );
    };

export default Day;