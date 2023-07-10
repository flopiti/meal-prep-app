import styles from '@/styles/Home.module.css';
import ScheduledMeal from './ScheduledMeal';
import { useScheduledMealContext } from '@/providers/ScheduledMealContext';
import { MealType, mealTypes } from '@/types/MealType';
import { getOrdinalSuffix } from '@/utils/GetOrdinalSuffix';

interface DayProps {
  day: Date;
}

const Day: React.FC<DayProps> = ({ day }) => {
  const { scheduledMeals } = useScheduledMealContext();
  
  const mealsOfTheDay = scheduledMeals.filter((meal: any) => meal.date === day);
  
  const formatDate = (date: Date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
    
    const dayOfWeek = adjustedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = adjustedDate.getDate();
    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
    
    return `${dayOfWeek} ${dayOfMonth}${ordinalSuffix}`;
  }
  
  const formattedDate = formatDate(day);

  const renderScheduledMeal = (mealType: MealType) => {
    const meal = mealsOfTheDay.find((meal: any) => meal.mealType === mealType) || null;
    return (
      <ScheduledMeal meal={meal} mealType={mealType} day={new Date(day).toISOString().slice(0, 10)} />
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