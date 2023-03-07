import styles from '@/styles/Home.module.css';
import Meal from './Meal';
const Day = ({ day, meals , scheduleMeal, removeMeal} :any) => {
    let mealTypes = ['breakfast', 'lunch', 'dinner'];
    return (
        <div
        className={styles.day}>
            {day}
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[0]) ? meals.find((meal:any) => meal.mealType === mealTypes[0]) : null} mealType={mealTypes[0]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal}/>
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[1]) ? meals.find((meal:any) => meal.mealType === mealTypes[1]) : null} mealType={mealTypes[1]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal}/>
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[2]) ? meals.find((meal:any) => meal.mealType === mealTypes[2]) : null} mealType={mealTypes[2]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal}/>
        </div>
    );
    };

export default Day;