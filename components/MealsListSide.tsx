import React, { useState } from 'react';
import ModalX from './ModalX';
import AddMealForm from './Modals/AddMealForm';
import styles from '../styles/MealList.module.css';
import MealItem from './MealItem';

export const Meals = ({likedMeals,meals, likeMeal, unlikeMeal, setLikedMeals , addMeal, removeMealFromList}:any) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);

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

  const scrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  }

  const scrollDown = () => {
    if (startIndex + 10 < meals.length) {
      setStartIndex(startIndex + 1);
    }
  }

  return (
    <div className={styles.mealList}>
      <h3 className={styles.subheader}>
        Meals
      </h3>
      {meals.slice(startIndex, startIndex + 10).map((meal:any) => {
        const liked = isMealLiked(meal.id);
        return (
          <MealItem
            removeMealFromList={removeMealFromList}
            key={meal.id}
            meal={meal}
            liked={liked}
            onLikeChange={() => (liked ? unlike(meal.id) : like(meal.id))}
          />
        );
      })}
      <button onClick={scrollUp}>Scroll Up</button>
      <button onClick={scrollDown}>Scroll Down</button>
      <button onClick={showModal}>+</button>
      <ModalX open={isOpen} setOpen={setIsOpen}> 
        <AddMealForm closeForm={()=>setIsOpen} addMeal={addMeal} />
      </ModalX>
    </div>
  );
}
