
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMeals } from "@/hooks/useMeals";
import Image from 'next/image'

const MealListAdmin = () => {


    const { getMeals, getMealsLike, likeMeal, unlikeMeal , deleteMeal} = useMeals();

    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        getMeals().then((data:any) => {
            console.log(data)
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
            {meals.map((meal) => (
            <li key={meal.id}>
                <h3>{meal.mealName}</h3>
                <p>{meal.description}</p>
                <p>{meal.price}</p>
                <button onClick={() => deleteMeal(meal.id)}>Delete</button>
                {
                    meal.iconUrl ?  <Image src={meal.iconUrl} alt={""} width={100} height={100}/> : <span></span>
                }
            </li>
            ))}
        </ul>
        </div>
    );
    };

export default MealListAdmin;