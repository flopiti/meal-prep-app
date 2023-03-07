import styles from '@/styles/Home.module.css';
import Meal from './Meal';
const Day = ({ day, meals } :any) => {
    let mealTypes = ['breakfast', 'lunch', 'dinner'];

    return (
        <div
        className={styles.day}>
            {day}
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[0]) ? meals.find((meal:any) => meal.mealType === mealTypes[0]).mealName : null} mealType={mealTypes[0]}/>
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[1]) ? meals.find((meal:any) => meal.mealType === mealTypes[1]).mealName : null} mealType={mealTypes[1]} />
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[2]) ? meals.find((meal:any) => meal.mealType === mealTypes[2]).mealName : null} mealType={mealTypes[2]}/>
        </div>
    );
    };

export default Day;