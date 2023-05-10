import Head from 'next/head'
import Calendar from '@/components/Calendar'
import { useEffect, useState } from 'react'
import { useScheduledMeals } from '@/hooks/useScheduledMeals'
import { useMeals } from '@/hooks/useMeals'
import { Meal } from '@/components/ScheduledMeal'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import LikedMealsList from '@/components/LikedMealsList'
import { Meals } from '@/components/MealsListSide'
import IngredientList from '@/components/IngredientList'
import { useIngredients } from '@/hooks/useIngredients'
import styles from '@/styles/Home.module.css'
import MobileApp from '@/components/_layouts/MobileApp'
import WebApp from '@/components/_layouts/WebApp'
export default function Home() {

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const { getScheduledMeals } = useScheduledMeals();
  const { getMeals, getMealsLike, likeMeal, unlikeMeal , deleteMeal} = useMeals();
  const {getIngredients, removeIngredient } = useIngredients();
  const[scheduledMeals, setScheduledMeals] = useState<ScheduledMeal[]>([]);
  const[meals, setMeals] = useState<Meal[]>([]);
  const[likedMeals, setLikedMeals] = useState<Meal[]>([]);
  const[ingredients, setIngredients] = useState<Meal[]>([]);

  const scheduleMeal = async ({id, date, mealType,mealId, mealName, iconUrl, meal2Name, icon2Url }: ScheduledMeal) => {
    setScheduledMeals([...scheduledMeals, {id, date, mealType,mealId, mealName, iconUrl, meal2Name, icon2Url }])
  }
  const removeMeal = async (id:number) => {
    setScheduledMeals(scheduledMeals.filter((meal:any) => meal.id !== id))
  }
  const addMealToScheduledMeal = async ({id, date, mealType, mealId, mealName, iconUrl, meal2Name, icon2Url}: ScheduledMeal) => {
    setScheduledMeals([...scheduledMeals.filter((meal:any) => meal.date !== date || meal.mealType !== mealType || meal.mealName !== mealName), {id, date, mealType, mealId, mealName, iconUrl, meal2Name, icon2Url } ])
  }

  const changeMeal = async ({id, date, mealType,mealId, mealName, iconUrl , meal2Name, icon2Url}:any) => {
    setScheduledMeals([...scheduledMeals.filter((meal:any)  => meal.id !== id), {id, date, mealType,mealId, mealName, iconUrl , meal2Name, icon2Url  } ])
  }

  const addMeal = async (meal:Meal) => {
    setMeals([...meals, meal])
  }

  const addIngredient = async (ingredient:any) => {
    setIngredients([...ingredients, ingredient])
  }

  const removeMealFromList = async (id:number) => {
    setMeals(meals.filter((meal:any) => meal.id !== id))
    deleteMeal(id.toString())
  }
  const deleteIngredient = async (id:number) => {
    removeIngredient(id.toString())
    setIngredients(ingredients.filter((ingredient:any) => ingredient.id !== id))
  }
  
  useEffect(() => {
    getMealsLike().then((data:any) => setLikedMeals(data))
    getMeals().then((data:any) => setMeals(data))
    getScheduledMeals().then((data:any) =>  setScheduledMeals(data));
    getIngredients().then((data:any) =>  setIngredients(data));
  }, [])  

  return (
    <>
      <div>
        {
          isMobile ?
          <MobileApp scheduledMeals={scheduledMeals} scheduleMeal={scheduleMeal} removeMeal={removeMeal} addMealToScheduledMeal={addMealToScheduledMeal} />
          :
          <WebApp scheduledMeals={scheduledMeals} scheduleMeal={scheduleMeal} changeMeal={changeMeal} removeMeal={removeMeal} addMealToScheduledMeal={addMealToScheduledMeal} likedMeals={likedMeals} meals={meals} likeMeal={likeMeal} unlikeMeal={unlikeMeal} setLikedMeals={setLikedMeals} addMeal={addMeal} removeMealFromList={removeMealFromList} ingredients={ingredients} addIngredient={addIngredient} deleteIngredient={deleteIngredient}/>
        }
      </div>
    </>
  )
}

export type ScheduledMeal = {
  id: number;
  date: string;
  mealType: string;
  mealId: number;
  mealName: string;
  iconUrl: string;
  meal2Name: string;
  icon2Url: string;
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      },
    };
  },
});
