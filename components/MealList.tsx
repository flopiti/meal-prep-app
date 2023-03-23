import { useMeals } from "@/hooks/useMeals";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import { Modal, Box, Button } from '@mui/material';
import React from "react";
import AddMealForm from "./AddMealForm";

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

    const addNewMeal = () => {
        
        console.log("add meal")
    }

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
                <button className={styles.xbutton} onClick={(()=>setOpen(true))}>
                    +
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">
                        Add Meal
                    </h2>
                    <p id="child-modal-description">
                    </p>
                    <AddMealForm closeForm={handleClose} />
                    <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
        </div>
        );
    };

export default MealList;