import { MealIngredient } from "./MealIngredient";

export type Meal = {
    id: number;
    mealName: string;
    mealId: number;
    iconUrl: string;
    mealIngredients: MealIngredient[];
};