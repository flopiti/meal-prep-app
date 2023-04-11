import { useMeals } from "@/hooks/useMeals";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { Modal, Box, Button } from '@mui/material';
import React from "react";
import AddMealForm from "./AddMealForm";
import ModalX from "./ModalX";

export type Meal = {
    mealName: string,
    ingredients: string[],
    iconUrl: string,
  }

const MealList = ({meals, addMeal}:any) => {

    const [isDragging, setIsDragging] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDragStart = (event:any, index:number) => {
        setIsDragging(true);
        event.dataTransfer.setData('1', meals[index].id);
      };

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
                            meal.iconUrl ?  <Image className={styles.mealIconSmall}  src={meal.iconUrl} alt="food" width={25} height={25} /> : <span></span>
                        }
                    </span>)
                })
            }
                    <button onClick={showModal}>Open Dialog</button>
                    <ModalX open={isOpen} setOpen={setIsOpen}> 
                        <AddMealForm closeForm={setIsOpen} addMeal={addMeal} />
                    </ModalX>
                <button className={styles.xbutton} onClick={(()=>setOpen(true))}>
                    +
                </button>
        </div>
        );
    };

export default MealList;