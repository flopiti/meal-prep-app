import { useMeals } from "@/hooks/useMeals";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'

export type Meal = {
    mealName: string,
    ingredients: string[]
  }

const MealList = () => {
    const {getMeals} = useMeals();
    const[meals, setMeals] = useState<Meal[]>([]);

    useEffect (() => {  
        getMeals().then((data:any) => {
            setMeals(data); 
        })}, []);
    return (
        <div className={styles.mealList}>
            {
                meals.map((meal:Meal) => {
                    return <span className={styles.mealItem}>
                        {meal.mealName}
                    </span>
                })
            }
        </div>
        );
    };

export default MealList;