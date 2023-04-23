import React from 'react';


export const Meals = ({likedMeals,meals, likeMeal, unlikeMeal, setLikedMeals }:any) => {
    const isMealLiked = (id: number) => {
        return likedMeals.some((likedMeal: { id: number; }) => likedMeal.id === id);
    }
    const like = (id: number) => {
        setLikedMeals([...likedMeals, meals.find((meal: { id: number; }) => meal.id === id)]);
        likeMeal(id);
    }
    const unlike = (id: number) => {
        setLikedMeals(likedMeals.filter((likedMeal: { id: number; }) => likedMeal.id !== id));
        unlikeMeal(id);
    }
    return (
        <div>
            <ul>
                {meals.map((meal:any) => {
                    const liked = isMealLiked(meal.id);
                    return (
                        <li key={meal.id}>
                            <input
                                type="checkbox"
                                checked={liked}
                                onChange={() => (liked ? unlike(meal.id) : like(meal.id))}
                            />
                            {meal.mealName}
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}
