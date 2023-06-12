import { MealIngredient } from "./MealIngredient";

export type Meal = {
    id: number | null;
    mealName: string;
    iconUrl: string;
    mealIngredients: MealIngredient[];
};