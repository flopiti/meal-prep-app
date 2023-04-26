import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import React, { useState } from "react";
import AddMealForm from "./AddMealForm";
import ModalX from "./ModalX";

export type Meal = {
    id: number,
    mealName: string,
    ingredients: string[],
    iconUrl: string,
  }

const LikedMealsList = ({meals}:any) => {

    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (event:any, index:number) => {
        setIsDragging(true);
        event.dataTransfer.setData('1', meals[index].id);
      };

    return (
        <div className={styles.mealList}>
            {
                meals?.map((meal:Meal, index:number) => {
                    return (
                    <span 
                    key={index}
                    draggable
                    onDragStart={()=>handleDragStart(event, index)}
                    className={styles.mealItem}>
                        <span>{meal.mealName}</span>
                        {
                            meal.iconUrl ?  <Image className={styles.mealIconSmall}  src={meal.iconUrl} alt="food" width={25} height={25} /> : <span></span>
                        }
                    </span>)
                })
            }
        </div>
        );
    };

export default LikedMealsList;