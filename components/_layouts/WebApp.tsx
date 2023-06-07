import Calendar from "../Calendar";
import IngredientList from "../IngredientList";
import LikedMealsList from "../LikedMealsList";
import { Meals } from "../MealsListSide";
import styles from "../../styles/WebApp.module.css";

interface WebAppProps {
}

const WebApp = ({}:WebAppProps) => (
    <div className={styles.flexMain}>
        <div style={{display: 'inline-block'}}>
            <Calendar/>
        </div>
    </div>
);

export default WebApp;