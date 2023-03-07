import styles from '@/styles/Home.module.css';
import Meal from './Meal';

const Day = ({ day } :any) => {
    let meals = ['Breakfast', 'Lunch', 'Dinner'];
    return (
        <div
        className={styles.day}>
            {day}
            <Meal meal={meals[0]}/>
            <Meal meal={meals[1]}/>
            <Meal meal={meals[2]}/>
        </div>
    );
    };

export default Day;