import { useEffect, useState } from 'react'
import { useScheduledMeals } from '@/hooks/useScheduledMeals'
import { useMeals } from '@/hooks/useMeals'
import { Meal } from '@/components/ScheduledMeal'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useIngredients } from '@/hooks/useIngredients'
import MobileApp from '@/components/_layouts/MobileApp'
import WebApp from '@/components/_layouts/WebApp'
import { ScheduledMealProvider } from '@/providers/ScheduledMealContext'
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
  const[meals, setMeals] = useState<Meal[]>([]);
  const[likedMeals, setLikedMeals] = useState<Meal[]>([]);
  const[ingredients, setIngredients] = useState<Meal[]>([]);

  const addMeal = async (meal:Meal) => {
    setMeals([...meals, meal])
  }

  const addIngredient = async (ingredient:any) => {
    setIngredients([...ingredients, ingredient])
  }

  const removeMealFromList = async (id:number) => {
    setMeals(meals.filter((meal:any) => meal.id !== id))
  }
  const deleteIngredient = async (id:number) => {
    removeIngredient(id.toString())
    setIngredients(ingredients.filter((ingredient:any) => ingredient.id !== id))
  }
  
  useEffect(() => {
    getMealsLike().then((data:any) => setLikedMeals(data))
    getMeals().then((data:any) => setMeals(data))
    getIngredients().then((data:any) =>  setIngredients(data));
  }, [])  

  return (
    <ScheduledMealProvider>
      <div style={{height: '96vh'  }}>
        {
          isMobile ?
          <MobileApp/>
          :
          <WebApp likedMeals={likedMeals} meals={meals} likeMeal={likeMeal} unlikeMeal={unlikeMeal} setLikedMeals={setLikedMeals} addMeal={addMeal} removeMealFromList={removeMealFromList} ingredients={ingredients} addIngredient={addIngredient} deleteIngredient={deleteIngredient}/>
        }
      </div>
    </ScheduledMealProvider>
  )
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
