import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScheduledMeal } from "@/types/ScheduledMealType";

interface ScheduledMealState {
  scheduledMeals: ScheduledMeal[];
}

const initialState: ScheduledMealState = { scheduledMeals: [] };

const scheduledMealSlice = createSlice({
  name: "scheduledMeals",
  initialState,
  reducers: {
    scheduleMeal: (state, action: PayloadAction<ScheduledMeal>) => {
      state.scheduledMeals.push(action.payload);
    },
    removeMeal: (state, action: PayloadAction<number>) => {
      state.scheduledMeals = state.scheduledMeals.filter(
        (meal) => meal.id !== action.payload,
      );
    },
    changeMeal: (state, action: PayloadAction<ScheduledMeal>) => {
      const index = state.scheduledMeals.findIndex(
        (meal) => meal.id === action.payload.id,
      );
      if (index !== -1) {
        state.scheduledMeals[index] = action.payload;
      }
    },
    setScheduledMeals: (state, action: PayloadAction<ScheduledMeal[]>) => {
      state.scheduledMeals = action.payload;
    },
  },
});

export const { scheduleMeal, removeMeal, changeMeal, setScheduledMeals } =
  scheduledMealSlice.actions;

export default scheduledMealSlice.reducer;
