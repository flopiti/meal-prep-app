import { useScheduledMeals } from "@/hooks/useScheduledMeals";
import { useMealContext } from "@/providers/MealContext";
import { useScheduledMealContext } from "@/providers/ScheduledMealContext";
import styles from '@/styles/ScheduleMealModal.module.css';
import Image from 'next/image';
const ScheduleMealModal = ({closeForm} :any) => {
    const {meals} = useMealContext();  
    const {scheduleMeal} = useScheduledMealContext();
    const { postScheduledMeal } = useScheduledMeals();

    return <div className={styles.box}>
        <div className={styles.meals}>
        {
            meals.map((meal:any) => {
                return <div className={styles.meal}>
                    <div className={styles.mealName}>{meal.name}</div>
                    <Image src={meal.iconUrl} alt={''} width={100} height={100}/>
                
                </div>
            }
            )
        }
        </div>

    </div>
}

export default ScheduleMealModal;