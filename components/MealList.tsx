import { useMeals } from "@/hooks/useMeals";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'

export type Meal = {
    mealName: string,
    ingredients: string[]
  }

const MealList = ({meals}:any) => {

    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (event:any) => {
        console.log('dragging')
        setIsDragging(true);
        event.dataTransfer.setData('text/plain', meals[0].mealName);
      };
    
    return (
        <div className={styles.mealList}>
            {
                meals.map((meal:Meal) => {
                    return (
                    <span 
                    draggable
                    onDragStart={handleDragStart}
                    style={{ opacity: isDragging ? 0.5 : 1 }}

                    className={styles.mealItem}>
                        {meal.mealName}
                    </span>)
                })
            }
        </div>
        );
    };

export default MealList;