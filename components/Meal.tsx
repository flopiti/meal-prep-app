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
    const { deleteScheduledMeal, putScheduledMeal } = useScheduledMeals();
    const deleteMeal = () => {
        if(!meal) return;
        deleteScheduledMeal(meal.id).then(() => {
            removeMeal({
                mealName: meal.mealName,
                date: meal.date,
                mealType: meal.mealType,
                id: meal.id
            })
        });
    };

    const { postScheduledMeal } = useScheduledMeals();

    const handleDrop = (data:any, iconUrl:any) => {
        if(meal){
            putScheduledMeal(meal.id, data, day, mealType, iconUrl, meal.mealName, meal.iconUrl).then((res:any) => {
                console.log('hello')
                removeMeal({
                    mealName: meal.mealName,
                    date: meal.date,
                    mealType: meal.mealType,
                    id: meal.id
                });
                scheduleMeal({
                    mealName: res.mealName,
                    date: res.date,
                    mealType: res.mealType,
                    id: res.id,
                    iconUrl: res.iconUrl,
                    meal2Name: res.meal2Name,
                    icon2Url: res.icon2Url
                });
            });
        }
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
                meal?.mealName && meal?.meal2Name ? (
                    <DropZone onDrop={handleDrop}>
                    <motion.div 
                    className={styles.twoMealChoice}
                    animate={{ backgroundColor: "#28afb0", scale: [0.25, 1] }}
                    transition={{ duration: 2, type : "spring", stiffness: 200}}
                    >
                        <motion.div
                            className={styles.mealIcon}
                            initial={{ y: 150 }}
                            animate={{ y: [150,5], rotate: [0, 360]                          
                            }
                        }   transition={{ duration: 1, stiffness: 100}}
                        >
                            {meal.iconUrl ?  <Image src={meal.iconUrl} alt="food" width={84} height={84} /> : <span></span>}
                        </motion.div>
                        <motion.div
                            className={styles.mealIcon}
                            initial={{ y: 150 }}
                            animate={{ y: [150,5], rotate: [0, 360]                          
                            }
                        }   transition={{ duration: 1, stiffness: 100}}
                        >
                            {meal.icon2Url ?  <Image src={meal.icon2Url} alt="food" width={84} height={84} /> : <span></span>}
                        </motion.div>
                    </motion.div>
                </DropZone>
                ) :

                meal ? (                        
                <DropZone onDrop={handleDrop}>
                    <motion.div 
                    className={styles.mealChoice}
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
                        }   transition={{ duration: .5, stiffness: 100}}
                        >
                            {meal.iconUrl ?  <Image src={meal.iconUrl} alt="food" width={64} height={64} /> : <span></span>}
                        </motion.div>
                    </motion.div>
                </DropZone>
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
