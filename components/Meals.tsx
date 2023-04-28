import React, { useState } from 'react';
import ModalX from './ModalX';
import AddMealForm from './AddMealForm';


export const Meals = ({likedMeals,meals, likeMeal, unlikeMeal, setLikedMeals , addMeal}:any) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };
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
        <div style={{display: 'flex'}}>
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
                <button  onClick={showModal}>+</button>
            </ul>
          <ModalX open={isOpen} setOpen={setIsOpen}> 
              <AddMealForm closeForm={()=>setIsOpen} addMeal={addMeal} />
          </ModalX>
        </div>
    );

}
