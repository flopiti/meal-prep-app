
import React, { useEffect, useState } from "react";
import { useMeals } from "@/hooks/useMeals";
import Image from 'next/image'
import ModalX from "@/components/ModalX";
import EditMealForm from "@/components/Modals/EditMealForm";

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
        <ul>
            {meals?.map((meal) => (
            <li key={meal.id}>
                <h3>{meal.mealName}</h3>
                <p>{meal.description}</p>
                <p>{meal.price}</p>
                <button onClick={() => deleteMeal(meal.id)}>Delete</button>
                {
                    meal.iconUrl ?  <Image src={meal.iconUrl} alt={""} width={100} height={100}/> : <span></span>
                }
                <button onClick={() => {
                    setChosenMeal(meal)
                    showModal()
                }}>Edit</button>
                <ModalX open={isOpen} setOpen={setIsOpen}> 
                    <EditMealForm closeForm={()=>setIsOpen} meal={chosenMeal} editMeal={editMealState} />
                </ModalX>
            </li>
            ))}
        </ul>
        </div>
    );
    };

export default MealListAdmin;