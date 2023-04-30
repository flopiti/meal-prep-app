import React, { useState } from 'react';
import ModalX from './ModalX';
import AddMealForm from './AddMealForm';
import styles from '../styles/MealList.module.css';
import MealItem from './MealItem';

export const Meals = ({likedMeals,meals, likeMeal, unlikeMeal, setLikedMeals , addMeal}:any) => {


  const[isOpen, setIsOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsOpen(true);
  };
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
        <div style={{display: 'flex'}} className={styles.MealList}>
            <h3 className={styles.subheader}>
                Meals
            </h3>
                {meals.map((meal:any) => {
                    const liked = isMealLiked(meal.id);
                    return (
                        <MealItem
                            key={meal.id}
                            meal={meal}
                            liked={liked}
                            onLikeChange={() => (liked ? unlike(meal.id) : like(meal.id))}
                        />
                    );
                })}
            
            <button  onClick={showModal}>+</button>
          <ModalX open={isOpen} setOpen={setIsOpen}> 
              <AddMealForm closeForm={()=>setIsOpen} addMeal={addMeal} />
          </ModalX>
        </div>
    );
}
