import styles from '@/styles/Home.module.css';
import Meal from './Meal';
const Day = ({ day, meals , scheduleMeal, removeMeal} :any) => {
    let mealTypes = ['breakfast', 'lunch', 'dinner'];
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateStringTomorrow = tomorrow.toISOString().slice(0, 10);
    return (
        <div
        className={styles.day}>
            <h1 className={styles.dayTitle}>{dateString===day ? 'Today' : dateStringTomorrow===day ? 'Tomorrow' : '' }</h1>
            {day}
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[0]) ? meals.find((meal:any) => meal.mealType === mealTypes[0]) : null} mealType={mealTypes[0]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal}/>
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[1]) ? meals.find((meal:any) => meal.mealType === mealTypes[1]) : null} mealType={mealTypes[1]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal}/>
            <Meal meal={meals.find((meal:any) => meal.mealType === mealTypes[2]) ? meals.find((meal:any) => meal.mealType === mealTypes[2]) : null} mealType={mealTypes[2]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal}/>
        </div>
    );
    };

export default Day;