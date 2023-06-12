export interface MealIngredient {
    id: number | null;
    ingredientId: number;
    ingredientName: string;
    quantity: number;
    unitOfMeasurement: string;
}