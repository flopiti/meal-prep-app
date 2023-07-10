import styles from '@/styles/Home.module.css';
import { useScheduledMealContext } from '@/providers/ScheduledMealContext';
import { MealType, mealTypes } from '@/types/MealType';
import { ScheduledMeal } from '@/types/ScheduledMealType';
import ScheduledMealZone from './ScheduledMealZone';
import { formatDate } from '@/utils/FormatDate';

interface DayProps {
  date: string;
}

const Day: React.FC<DayProps> = ({ date }) => { 
  const { scheduledMeals } = useScheduledMealContext();

  const mealsOfTheDay = scheduledMeals.filter((scheduledMeal: ScheduledMeal) => scheduledMeal.date === date);
  const formattedDate = formatDate(date);

  const renderScheduledMeal = (mealType: MealType) => {
    const meal = mealsOfTheDay.find((meal: any) => meal.mealType === mealType) || null;
    return (
      <ScheduledMealZone meal={meal} mealType={mealType} day={new Date(date).toISOString().slice(0, 10)} />
    );
  }
  return (
    <div>
      <div className={styles.date}>
        {formattedDate}
      </div>
      <div className={styles.day}>
        {mealTypes.map(renderScheduledMeal)}
      </div>
    </div>
  );
};

export default Day;