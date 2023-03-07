import styles from '@/styles/Home.module.css';
import Meal from './Meal';

const Day = ({ day } :any) => {
    let meals = ['Breakfast', 'Lunch', 'Dinner'];
    return (
        <div
        className={styles.day}>
            {day}
            {
                meals.map((meal) => {
                    return <Meal meal={meal}/>
                })       
            }
        </div>
    );
    };

export default Day;