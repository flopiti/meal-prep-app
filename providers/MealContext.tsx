import { createContext, useContext, useState } from "react";
import { Meal } from "@/types/Meal";
import { useIngredients } from "@/hooks/useIngredients";
import { Ingredient } from "@/types/Ingredient";

interface MealContextType {
    likedMeals : Meal[];
    meals : Meal[];
    addMeal: (meal:Meal) => void;
    removeMealFromList: (id:number) => void;
    setLikedMeals: (meals: Meal[]) => void;
    ingredients: Ingredient[];
    addIngredient: (ingredient:Ingredient) => void;
    deleteIngredient: (id:number) => void; 
    setMeals: (meals: Meal[]) => void;
}

export const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: any) => {
    const[likedMeals, setLikedMeals] = useState<Meal[]>([]);
    const[meals, setMeals] = useState<Meal[]>([]);

    const[ingredients, setIngredients] = useState<Ingredient[]>([]);
    const { removeIngredient } = useIngredients();

    const addIngredient = async (ingredient:any) => {
      setIngredients([...ingredients, ingredient])
    }
  
    const deleteIngredient = async (id:number) => {
      removeIngredient(id.toString())
      setIngredients(ingredients.filter((ingredient:any) => ingredient.id !== id))
    }

    const addMeal = async (meal:Meal) => {
        setMeals([...meals, meal])
      }
    const removeMealFromList = async (id:number) => {
    setMeals(meals.filter((meal:any) => meal.id !== id))
    }    
  
    return (
      <MealContext.Provider value={{ likedMeals,  setLikedMeals, meals, addMeal, removeMealFromList, ingredients, addIngredient, deleteIngredient, setMeals
      }}>
        {children}
      </MealContext.Provider>
    );
  }
  
  export const useMealContext = () => {
    const context = useContext(MealContext);
    if (context === undefined) {
      throw new Error('useMealContext must be used within a MealProvider');
    }
    return context;
  }