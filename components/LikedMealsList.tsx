import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import React, { useState } from "react";
import LikeAnimation from './LikeAnimation';

export type Meal = {
    id: number,
    mealName: string,
    ingredients: string[],
    iconUrl: string,
  }

const LikedMealsList = ({meals, unlikeMeal, setLikedMeals}:any) => {

    const handleDragStart = (event:any, index:number) => {
        event.dataTransfer.setData('1', meals[index].id);
      };

    const unlikeAndRemoveMeal = (id:number) => {
        unlikeMeal(id).then(() => {
            setLikedMeals(meals.filter((likedMeal: { id: number; }) => likedMeal.id !== id));
        }
        )
    }
    return (
        <div className={styles.mealList}>
            {
                meals?.map((meal:Meal, index:number) => {
                    return (
                    <span 
                    key={meal.id}
                    draggable
                    onDragStart={()=>handleDragStart(event, index)}
                    className={styles.mealItem}>
                        <LikeAnimation 
                            liked={true} 
                            onLikeChange={()=>unlikeAndRemoveMeal(meal.id)}/>
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