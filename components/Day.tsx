import styles from '@/styles/Home.module.css';
import ScheduledMeal from './ScheduledMeal';
import { useScheduledMealContext } from '@/providers/ScheduledMealContext';
const Day = ({ day } :any) => {

    const { scheduledMeals } = useScheduledMealContext();

    const mealsOfTheDay = scheduledMeals.filter((meal:any) => meal.date === day);
    let mealTypes = ['breakfast', 'lunch', 'dinner'];

    function getOrdinalSuffix(day: number): string {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
    }
    day = new Date(day);
    day.setMinutes(day.getMinutes() + day.getTimezoneOffset());
    const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = day.getDate();
    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
    const formattedDate = `${dayOfWeek} ${dayOfMonth}${ordinalSuffix}`;

return (<div>
            <div className={styles.date}>
                {formattedDate}
            </div>
            <div className={styles.day}>
                <ScheduledMeal meal={mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[0]) ? mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[0]) : null} day={day} mealType={mealTypes[0]}/>
                <ScheduledMeal meal={mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[1]) ? mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[1]) : null} mealType={mealTypes[1]} day={day} />
                <ScheduledMeal meal={mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[2]) ? mealsOfTheDay.find((meal:any) => meal.mealType === mealTypes[2]) : null} mealType={mealTypes[2]} day={day}/>
            </div>
        </div>
    );
    };

export default Day;