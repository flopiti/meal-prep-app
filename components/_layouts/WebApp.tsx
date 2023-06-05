import Calendar from "../Calendar";
import IngredientList from "../IngredientList";
import LikedMealsList from "../LikedMealsList";
import { Meals } from "../MealsListSide";
import styles from "../../styles/WebApp.module.css";

interface WebAppProps {
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
}

const WebApp = ({likedMeals, likeMeal, meals, unlikeMeal, setLikedMeals, addMeal, removeMealFromList}:WebAppProps) => (
    <div className={styles.flexMain}>
        <div style={{ width: '80%', display: 'inline-block'}}>
            <Calendar/>
            <LikedMealsList meals={likedMeals} unlikeMeal={unlikeMeal} setLikedMeals={setLikedMeals}/>
        </div>
        <div style={{ width: '20%', display: 'inline-block', height:'100vh'}}>
            <Meals likedMeals={likedMeals} meals={meals} likeMeal={likeMeal} unlikeMeal={unlikeMeal} setLikedMeals={setLikedMeals} addMeal={addMeal} removeMealFromList={removeMealFromList} />
        </div>
    </div>
);

export default WebApp;