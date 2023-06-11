
import React, { useEffect, useState } from "react";
import { useMeals } from "@/hooks/useMeals";
import ModalX from "@/components/ModalX";
import MealCard from "@/components/MealCard/MealCard";
import styles from "./MealListAdmin.module.css";
import AddMealForm from "@/components/Modals/MealForm";

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



    const addMeal = async (meal:any) => {
            setMeals([...meals, meal])
            setIsAddModalOpen(false)
    }

    const editMealState = async (meal:any) => {
        editMeal(meal).then((editedMeal:any) => {
            setMeals(meals.map((m) => m.id === m.id ? editedMeal : m))
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
            <AddMealForm closeForm={()=>setIsAddModalOpen} addMeal={addMeal} />
        </ModalX>
        </div>
    );
    };

export default MealListAdmin;