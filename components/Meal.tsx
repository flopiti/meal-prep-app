import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import styles from '../styles/Home.module.css';
import { DropZone } from './Dropzone';

export type Meal = {
    date: string;
    mealType: string;
    mealName: string;
};

const Meal = ({ meal, mealType , scheduleMeal, day, removeMeal} :any) => {

    const { deleteScheduledMeal } = useScheduledMeals();
    const deleteMeal = () => {
        if(!meal) return;
        deleteScheduledMeal(meal.id);
        removeMeal(meal.mealName, day, mealType);
    };

    const { postScheduledMeal } = useScheduledMeals();
    const handleDrop = (data:any) => {
        postScheduledMeal(data, day, mealType).then((res:any) => {
            scheduleMeal(res.id, res.mealName ,res.date, res.mealType);
        });
      };

    return (
        <div className={styles.meal}>
            <div>
                <span>{mealType}</span>
                <button className={styles.xbutton} onClick={deleteMeal}>
                    X
                </button>
            </div>
            {
                meal ? (
                    <div className={styles.mealChoice}>
                        {meal.mealName }
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
