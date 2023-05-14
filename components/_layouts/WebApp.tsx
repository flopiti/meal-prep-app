import Calendar from "../Calendar";
import IngredientList from "../IngredientList";
import LikedMealsList from "../LikedMealsList";
import { Meals } from "../MealsListSide";
import styles from "../../styles/WebApp.module.css";

interface WebAppProps {
    scheduledMeals: any;
    scheduleMeal: any;
    removeMeal: any;
    addMealToScheduledMeal: any;
    likedMeals: any;
    meals: any;
    likeMeal: any;
    unlikeMeal: any;
    setLikedMeals: any;
    addMeal: any;
    removeMealFromList: any;
    ingredients: any;
    addIngredient: any;
    deleteIngredient: any;
    changeMeal: any;
}

const WebApp = ({scheduleMeal, scheduledMeals, removeMeal,changeMeal, addMealToScheduledMeal, likedMeals, likeMeal, meals, addIngredient, unlikeMeal, setLikedMeals, addMeal, removeMealFromList, deleteIngredient, ingredients}:WebAppProps) => (
    <div className={styles.flexMain}>
        <div style={{ width: '80%', display: 'inline-block'}}>
            <Calendar scheduledMeals={scheduledMeals} scheduleMeal={scheduleMeal} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal} />
            <LikedMealsList meals={likedMeals} />
        </div>
        <div style={{ width: '20%', display: 'inline-block', height:'100vh'}}>
            <Meals likedMeals={likedMeals} meals={meals} likeMeal={likeMeal} unlikeMeal={unlikeMeal} setLikedMeals={setLikedMeals} addMeal={addMeal} removeMealFromList={removeMealFromList} />
        </div>
    </div>
);

export default WebApp;