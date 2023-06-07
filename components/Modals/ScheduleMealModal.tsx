import { useScheduledMeals } from "@/hooks/useScheduledMeals";
import { useMealContext } from "@/providers/MealContext";
import { useScheduledMealContext } from "@/providers/ScheduledMealContext";
import styles from '@/styles/ScheduleMealModal.module.css';
import Image from 'next/image';
import { useRef, useState } from "react";
const ScheduleMealModal = ({closeForm, day, mealType} :any) => {
    const {meals} = useMealContext();  
    const {scheduleMeal} = useScheduledMealContext();
    const { postScheduledMeal } = useScheduledMeals();
    const stopScrolling = () => {
        clearInterval(scrollInterval);
    }
    const mealsRef = useRef<any>(null);
    const [scrollInterval, setScrollInterval] = useState<any>(null);
    const startScrolling = (direction:any) => {
        setScrollInterval(setInterval(() => {
            if (direction === 'left') {
                mealsRef.current.scrollLeft -= 5;
            } else {
                mealsRef.current.scrollLeft += 5;
            }
        }, 20));
    }
    return <div className={styles.box}>
    <div
        className={`${styles.hoverArea} ${styles.left}`}
        onMouseOver={() => startScrolling('left')}
        onMouseOut={stopScrolling}
    />
    <div
        className={`${styles.hoverArea} ${styles.right}`}
        onMouseOver={() => startScrolling('right')}
        onMouseOut={stopScrolling}
    />
    <div ref={mealsRef} className={styles.meals}>
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