import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import styles from '../styles/Home.module.css';
import { DropZone } from './Dropzone';
import {motion } from 'framer-motion';

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
        removeMeal({
            mealName: meal.mealName,
            date: meal.date,
            mealType: meal.mealType,
            id: meal.id
        });
    };

    const { postScheduledMeal } = useScheduledMeals();
    const handleDrop = (data:any) => {
        postScheduledMeal(data, day, mealType).then((res:any) => {
            scheduleMeal({
                mealName: res.mealName,
                date: res.date,
                mealType: res.mealType,
                id: res.id            
            });
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
            <motion.div 
            // className={styles.mealBox}
            animate={{ backgroundColor: meal ? "#f03f35" : "blue" }}
            transition={{ duration: 10, ease: "easeInOut" }}>
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

            </motion.div>

        </div>
    );
};

export default Meal;
