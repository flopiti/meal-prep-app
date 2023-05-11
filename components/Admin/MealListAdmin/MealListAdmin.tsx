
import React, { useEffect, useState } from "react";
import { useMeals } from "@/hooks/useMeals";
import Image from 'next/image'
import ModalX from "@/components/ModalX";
import EditMealForm from "@/components/Modals/EditMealForm";
import MealCard from "@/components/MealCard/MealCard";
import styles from "./MealListAdmin.module.css";

const MealListAdmin = () => {

    const { getMeals, deleteMeal, editMeal} = useMeals();
    const [isOpen, setIsOpen] = useState<boolean>(false);
  
    const showModal = () => {
      setIsOpen(true);
    };

    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chosenMeal, setChosenMeal] = useState<any>(null);

    const editMealState = async (id:string, meal:any) => {
        editMeal(id, meal).then((editedMeal:any) => {
            setMeals(meals.map((m) => m.id === id ? editedMeal : m))
            setIsOpen(false)
        }).catch((err:any) => {
            console.log(err)
        }
        )
    }

    // write the removemeal function call it deleteMeal and change the state like the editMealState
    const deleteMealState = async (id:string) => {
        deleteMeal(id).then((deletedMeal:any) => {
            setMeals(meals.filter((m) => m.id !== id))
            setIsOpen(false)
        }).catch((err:any) => {
            console.log(err)
        }
        )
    }
    
    useEffect(() => {
        getMeals().then((data:any) => {
            setMeals(data)
            setLoading(false)
        }).catch((err:any) => {
            setError(err)
            console.log(err)
        }
        )
    }, []);

    console.log(meals)

    return (
        <div>
        {loading && <span>loading...</span>}
        {error && <p>{error}</p>}
        <div className={styles.adminMealContainer}>
            {
            meals.map((meal:any)=>(
                <MealCard 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                chosenMeal={chosenMeal}
                meal={meal} deleteMeal={deleteMealState} editMealState={editMealState} showModal={showModal} setChosenMeal={setChosenMeal}/>
            ))
            }   
        </div>
        </div>
    );
    };

export default MealListAdmin;