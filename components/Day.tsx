import styles from '@/styles/Home.module.css';
import ScheduledMeal from './ScheduledMeal';
const Day = ({ day, meals , scheduleMeal, removeMeal, addMealToScheduledMeal, changeMeal} :any) => {
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
    const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
    console.log(dayOfWeek);
    const dayOfMonth = day.getDate();
    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
    const formattedDate = `${dayOfWeek} ${dayOfMonth}${ordinalSuffix}`;

    return (<div>
        <div className={styles.date}>
            {formattedDate}
        </div>
        <div
        className={styles.day}>
            <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[0]) ? meals.find((meal:any) => meal.mealType === mealTypes[0]) : null} mealType={mealTypes[0]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
            <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[1]) ? meals.find((meal:any) => meal.mealType === mealTypes[1]) : null} mealType={mealTypes[1]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
            <ScheduledMeal meal={meals.find((meal:any) => meal.mealType === mealTypes[2]) ? meals.find((meal:any) => meal.mealType === mealTypes[2]) : null} mealType={mealTypes[2]} scheduleMeal={scheduleMeal} day={day} removeMeal={removeMeal} changeMeal={changeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
        </div>
        </div>
    );
    };

export default Day;