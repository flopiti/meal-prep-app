import { ScheduledMeal } from "@/types/ScheduledMealType";
import React, { createContext, useState, useContext } from "react";

interface ScheduledMealContextType {
  scheduledMeals: ScheduledMeal[];
  scheduleMeal: (meal: ScheduledMeal) => Promise<void>;
  removeMeal: (id: number) => Promise<void>;
  changeMeal: (meal: ScheduledMeal) => Promise<void>;
  setScheduledMeals: (meals: ScheduledMeal[]) => void;
}

export const ScheduledMealContext = createContext<
  ScheduledMealContextType | undefined
>(undefined);

export const ScheduledMealProvider = ({ children }: any) => {
  const [scheduledMeals, setScheduledMeals] = useState<ScheduledMeal[]>([]);

  const scheduleMeal = async (meal: ScheduledMeal) => {
    setScheduledMeals([...scheduledMeals, meal]);
  };

  const removeMeal = async (id: number) => {
    setScheduledMeals(scheduledMeals.filter((meal) => meal.id !== id));
  };

  const changeMeal = async (meal: ScheduledMeal) => {
    setScheduledMeals([
      ...scheduledMeals.filter((m) => m.id !== meal.id),
      meal,
    ]);
  };

  return (
    <ScheduledMealContext.Provider
      value={{
        scheduledMeals,
        scheduleMeal,
        removeMeal,
        changeMeal,
        setScheduledMeals,
      }}
    >
      {children}
    </ScheduledMealContext.Provider>
  );
};

export const useScheduledMealContext = () => {
  const context = useContext(ScheduledMealContext);
  if (context === undefined) {
    throw new Error(
      "useScheduledMealContext must be used within a ScheduledMealProvider",
    );
  }
  return context;
};
