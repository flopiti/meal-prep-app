import { useMeals } from "@/hooks/useMeals";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'
import Image from 'next/image'

export type Meal = {
    mealName: string,
    ingredients: string[],
    iconUrl: string,
  }

const MealList = ({meals}:any) => {

    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (event:any, index:number) => {
        setIsDragging(true);
        event.dataTransfer.setData('text/plain', meals[index].mealName);
      };
    
    return (
        <div className={styles.mealList}>
            {
                meals.map((meal:Meal, index:number) => {
                    return (
                    <span 
                    key={index}
                    draggable
                    onDragStart={()=>handleDragStart(event, index)}
                    className={styles.mealItem}>
                        <span>{meal.mealName}</span>
                        {
                            meal.iconUrl ?  <Image src={meal.iconUrl} alt="food" width={25} height={25} /> : <span>🍔</span>
                        }
                    </span>)
                })
            }
        </div>
        );
    };

export default MealList;