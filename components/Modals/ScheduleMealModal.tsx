import { useScheduledMeals } from "@/hooks/useScheduledMeals";
import { useMealContext } from "@/providers/MealContext";
import { useScheduledMealContext } from "@/providers/ScheduledMealContext";
import styles from '@/styles/ScheduleMealModal.module.css';
import Image from 'next/image';
const ScheduleMealModal = ({closeForm, day, mealType} :any) => {
    const {meals} = useMealContext();  
    const {scheduleMeal} = useScheduledMealContext();
    const { postScheduledMeal } = useScheduledMeals();

    return <div className={styles.box}>
        <div className={styles.meals}>
        {
            meals.map((meal:any) => {
                return <div className={styles.meal}>
                    <div className={styles.mealName}>{meal.name}</div>
                    <button onClick={() => {
                        postScheduledMeal(day, mealType, meal.id).then((res:any) => {
                            scheduleMeal({
                                mealName: res.mealName,
                                date: res.date,
                                mealType: res.mealType,
                                id: res.id, 
                                iconUrl: res.iconUrl,
                                mealId: meal.id
                            });
                            closeForm();
                        });
                    }
                    }
                    className={styles.mealButton}
                    >
                    <Image src={meal.iconUrl} alt={''} width={100} height={100}/>
                    </button>
                </div>
            }
            )
        }
        </div>

    </div>
}

export default ScheduleMealModal;