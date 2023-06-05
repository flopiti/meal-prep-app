import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import styles from '../styles/Home.module.css';
import { DropZone } from './Utils/Dropzone';
import {motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'
import { useMeals } from '@/hooks/useMeals';
import { useState } from 'react';
import ScheduledMealBox from './ScheduledMealBox';
import { useScheduledMealContext } from '@/providers/ScheduledMealContext';

export type Meal = {
    id: number;
    ingredients: string[];
    mealName: string;
    mealId: number;
};

const ScheduledMeal = ({ meal, mealType, day} :any) => {

    const { t } = useTranslation('common')
    const { deleteScheduledMeal, putScheduledMeal } = useScheduledMeals();
    const { getMeal } = useMeals();
    const { removeMeal, changeMeal, scheduleMeal } = useScheduledMealContext();
    const[iconUrl, setIconUrl] = useState<string|null>(null)
    const[mealName, setMealName] = useState<string|null>(null)
    if (meal){
        getMeal(meal.mealId).then((res:any) => {
            setIconUrl(res.iconUrl)
            setMealName(res.mealName)
        })
    }
    const deleteMeal = () => {
        if(!meal) return;
        deleteScheduledMeal(meal.id).then(() => {
            removeMeal(meal.id)
        });
    };

    const { postScheduledMeal } = useScheduledMeals();

    const handleDrop = (mealId:any, iconUrl:any, scheduledMealId:any) => {
        if(scheduledMealId){
            putScheduledMeal(scheduledMealId,  mealName!, day, mealType, iconUrl, mealId,  iconUrl).then((res:any) => { 
                getMeal(res.mealId).then((meal:any) => {
                    changeMeal(
                        {
                            id: res.id, 
                            date: res.date,
                            mealType: res.mealType,
                            mealId: res.mealId,
                            mealName: meal.mealName, 
                            iconUrl: meal.iconUrl
                        }
                    )
                })
              });
        }
        else{
            postScheduledMeal( day, mealType, mealId).then((res:any) => {
                scheduleMeal({
                    mealName: res.mealName,
                    date: res.date,
                    mealType: res.mealType,
                    id: res.id, 
                    iconUrl: res.iconUrl,
                    mealId: mealId
                });
            });
        }
      };
    return (
        <div className={styles.meal}>
            <div className={styles.mealType}   
            >
                <span>{t(mealType)}</span>
            </div>
            <motion.div 
                className={styles.scheduledSpot}
            >
            {
                meal ? (                        
                <DropZone onDrop={handleDrop}>
                    <ScheduledMealBox mealName={mealName} iconUrl={iconUrl} deleteMeal={deleteMeal} mealId={meal.id} 
                    scheduledMealId={meal.id}
                    />
                </DropZone>
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

export default ScheduledMeal;
