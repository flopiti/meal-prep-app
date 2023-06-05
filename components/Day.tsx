import styles from '@/styles/Home.module.css';
import ScheduledMeal from './ScheduledMeal';
const Day = ({ day, meals , scheduleMeal, removeMeal, addMealToScheduledMeal, changeMeal} :any) => {
    let mealTypes = ['breakfast', 'lunch', 'dinner'];
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateStringTomorrow = tomorrow.toISOString().slice(0, 10);
    return (
        <div
        className={styles.day}>
            <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[0]) ? meals.find((meal:any) => meal.mealType === mealTypes[0]) : null} mealType={mealTypes[0]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
            <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[1]) ? meals.find((meal:any) => meal.mealType === mealTypes[1]) : null} mealType={mealTypes[1]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
            <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[2]) ? meals.find((meal:any) => meal.mealType === mealTypes[2]) : null} mealType={mealTypes[2]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
        </div>
    );
    };

export default Day;