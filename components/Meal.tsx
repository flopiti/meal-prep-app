import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import styles from '../styles/Home.module.css';
import { DropZone } from './Dropzone';
import {motion } from 'framer-motion';
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export type Meal = {
    ingredients: string[];
    mealName: string;
};

const ScheduledMeal = ({ meal, mealType , scheduleMeal, day, removeMeal} :any) => {
    const { t } = useTranslation('common')
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
    const handleDrop = (data:any, iconUrl:any) => {
        postScheduledMeal(data, day, mealType, iconUrl).then((res:any) => {
            scheduleMeal({
                mealName: res.mealName,
                date: res.date,
                mealType: res.mealType,
                id: res.id, 
                iconUrl: res.iconUrl
            });
        });
      };


    return (
        <div className={styles.meal}>
            <div>
                <span>{t(mealType)}</span>
                <button className={styles.xbutton} onClick={deleteMeal}>
                    X
                </button>
            </div>
            <motion.div 
            >
            {
                meal ? (
                    <motion.div className={styles.mealChoice}
                    animate={{ backgroundColor: "#28afb0", scale: [0.25, 1] }}
                    transition={{ duration: 2, type : "spring", stiffness: 200}}
                    >
                        <div>
                            {meal.mealName }
                        </div>
                        <motion.div
                            className={styles.mealIcon}
                            initial={{ y: 150 }}
                            animate={{ y: [150,5], rotate: [0, 360]                          
                            }
                        }   transition={{ duration: 1, stiffness: 100}}
                        >
                            {meal.iconUrl ?  <Image src={meal.iconUrl} alt="food" width={64} height={64} /> : <span></span>}
                        </motion.div>
                    </motion.div>
                ) : (
                    <div>
                        <DropZone onDrop={handleDrop}>
                            Drop here
                        </DropZone>
                    </div>
                )
            }
            </motion.div>
        </div>
    );
};

export default ScheduledMeal;
