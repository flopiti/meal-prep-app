import styles from '@/styles/Home.module.css';
import Meal from './Meal';
import { useScheduledMeals } from '@/hooks/useScheduledMeals';
const Day = ({ day } :any) => {
    let mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
    const { getScheduledMeals } = useScheduledMeals();

    getScheduledMeals().then((data:any) => {
        console.log(data);
    });


    return (
        <div
        className={styles.day}>
            {day}
            <Meal meal={mealTypes[0]}/>
            <Meal meal={mealTypes[1]}/>
            <Meal meal={mealTypes[2]}/>
        </div>
    );
    };

export default Day;