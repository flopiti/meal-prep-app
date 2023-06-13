
import React, { useEffect, useState } from "react";
import { useMeals } from "@/hooks/useMeals";
import ModalX from "@/components/ModalX";
import MealCard from "@/components/MealCard/MealCard";
import styles from "./MealListAdmin.module.css";
import MealForm from "@/components/Modals/MealForm";
import { Meal } from "@/types/Meal";

const MealListAdmin = () => {

    const { getMeals, deleteMeal, editMeal, createMeal} = useMeals();
    
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const showEditModal = () => {
        setIsEditModalOpen(true);
    };

    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chosenMeal, setChosenMeal] = useState<any>(null);

    const createMealState = async (meal:Meal) => {
        createMeal(meal).then((returnedMeal:Meal)=>{
            setMeals([...meals, returnedMeal])
            setIsAddModalOpen(false)
        })
    }

    const editMealState = async (meal:Meal) => {
        editMeal(meal).then((editedMeal:Meal) => {
            setMeals(meals.map((m) => m.id === editedMeal.id ? editedMeal : m))
            setIsEditModalOpen(false)
        }).catch((err:any) => {
            console.log(err)
        }
        )
    }

    const deleteMealState = async (id:string) => {
        deleteMeal(id).then(() => {
            setMeals(meals.filter((m) => m.id !== id))
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

    return (
        <div>
        {loading && <span>loading...</span>}
        {error && <p>{error}</p>}
        <div className={styles.adminMealContainer}>
            {
            meals.map((meal:any, index:number)=>(
                <MealCard 
                key={index}
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
                chosenMeal={chosenMeal}
                meal={meal} deleteMeal={deleteMealState} editMealState={editMealState} showModal={showEditModal} setChosenMeal={setChosenMeal}/>
            ))
            }   
        </div>
        <button onClick={showAddModal}>+</button>
        <ModalX open={isAddModalOpen} setOpen={setIsAddModalOpen}> 
            <MealForm closeForm={() => setIsAddModalOpen} addMeal={createMealState} meal={null} editMeal={null}/>
        </ModalX>
        </div>
    );
    };

export default MealListAdmin;