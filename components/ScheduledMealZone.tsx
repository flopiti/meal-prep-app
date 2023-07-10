import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import styles from '../styles/Home.module.css';
import { DropZone } from './Utils/Dropzone';
import {motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'
import { useMeals } from '@/hooks/useMeals';
import { useState } from 'react';
import ScheduledMealBox from './ScheduledMealBox';
import { useScheduledMealContext } from '@/providers/ScheduledMealContext';
import ModalX from './ModalX';
import ScheduleMealModal from './Modals/ScheduleMealModal';
import XButton from './Utils/Xbutton/Xbutton';
import Image from 'next/image';

const ScheduledMealZone = ({ meal, mealType, day} :any) => {

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
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
    const showScheduleModal = () => {
        setIsScheduleModalOpen(true);
    };
    const { postScheduledMeal } = useScheduledMeals();
    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };
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
            {
                meal ? (            <motion.div className={styles.buttonContainer}
                    initial={fadeIn.initial}
                    animate={fadeIn.animate}
                    transition={{ duration: 2 }}
                >
                    <XButton onClick={()=>deleteMeal()}>X</XButton>
                </motion.div> ) : null
            }
            <button onClick={() => {
                    showScheduleModal()
                }}
                className={styles.mealButton}
                >
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
                            <Image src="/empty-plate.png" width={135} height={120} alt={''} />
                            <h4 className={styles.addMeal}>Add Meal</h4>
                        </DropZone>
                )
            }
            </motion.div>
            </button>
                <ModalX open={isScheduleModalOpen} setOpen={setIsScheduleModalOpen}> 
                    <ScheduleMealModal day={day} mealType={mealType} closeForm={()=>setIsScheduleModalOpen(false)} meal={meal} editMeal={putScheduledMeal} />
                </ModalX>

        </div>
    );
};

export default ScheduledMealZone;
