import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import styles from '../styles/Home.module.css';
import { DropZone } from './Dropzone';

export type Meal = {
    date: string;
    mealType: string;
    mealName: string;
};

const Meal = ({ meal, mealType , scheduleMeal, day} :any) => {
    const { postScheduledMeal } = useScheduledMeals();
    const handleDrop = (data:any) => {
        postScheduledMeal(data, day, mealType);
        scheduleMeal(data, day, mealType);
      };

    return (
        <div className={styles.meal}>
            <div>{mealType}</div>
            {
                meal ? (
                    <div className={styles.mealChoice}>
                        {meal }
                    </div>
                ) : (
                    <DropZone onDrop={handleDrop}>
                        Drop here
                    </DropZone>
                )
            }
        </div>
    );
};

export default Meal;
