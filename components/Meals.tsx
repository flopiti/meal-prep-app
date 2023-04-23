import React, { useEffect, useState } from 'react';
import { useMeals } from '../hooks/useMeals';
import { Meal } from './LikedMealsList';

export const Meals = () => {
    const { getMeals, likeMeal, unlikeMeal, createMeal, getMealsLike} = useMeals();

    const[meals, setMeals] = useState<Meal[]>([]);  
    const[likedMeals, setLikedMeals] = useState<Meal[]>([]);

    useEffect(() => {
        getMeals().then((data:any) => setMeals(data));
        getMealsLike().then((data:any) => setLikedMeals(data));
    }, [])
    const isMealLiked = (id: number) => {
        return likedMeals.some((likedMeal) => likedMeal.id === id);
    }
    return (
        <div>
            <button onClick={createMeal}>Create Meal</button>
            <ul>
                {meals.map((meal) => {
                    const liked = isMealLiked(meal.id);
                    return (
                        <li key={meal.id}>
                            <input
                                type="checkbox"
                                checked={liked}
                                onChange={() => (liked ? unlikeMeal(meal.id) : likeMeal(meal.id))}
                            />
                            {meal.mealName}
                            {/* <button onClick={() => deleteMeal(meal.id)}>Delete</button> */}
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}
