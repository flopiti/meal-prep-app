import styles from '@/styles/Home.module.css';
import ScheduledMeal from './ScheduledMeal';
import { useScheduledMealContext } from '@/providers/ScheduledMealContext';
const Day = ({ day } :any) => {

    const { scheduledMeals } = useScheduledMealContext();

    const mealsOfTheDay = scheduledMeals.filter((meal:any) => meal.date === day);
    let mealTypes = ['breakfast', 'lunch', 'dinner'];
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateStringTomorrow = tomorrow.toISOString().slice(0, 10);
    return (
        <div className={styles.day}>
            <div>
                <h1 className={styles.dayTitle}>{dateString===day ? 'Today' : dateStringTomorrow===day ? 'Tomorrow' : '' }</h1>
                {day}
            </div>
            <ScheduledMeal meal={mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[0]) ? scheduledMeals.find((meal:any) => meal.mealType === mealTypes[0]) : null} mealType={mealTypes[0]} day={day} />
            <ScheduledMeal meal={mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[1]) ? scheduledMeals.find((meal:any) => meal.mealType === mealTypes[1]) : null} mealType={mealTypes[1]} day={day} />
            <ScheduledMeal meal={mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[2]) ? scheduledMeals.find((meal:any) => meal.mealType === mealTypes[2]) : null} mealType={mealTypes[2]} day={day}/>
        </div>
    );
    };

export default Day;