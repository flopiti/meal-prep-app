import Calendar from "./Calendar";

interface MobileAppProps {
    scheduledMeals: any;
    scheduleMeal: any;
    removeMeal: any;
    addMealToScheduledMeal: any;
}

const MobileApp = ({scheduleMeal, scheduledMeals, addMealToScheduledMeal, removeMeal}:MobileAppProps) => {
    return (
        <div style={{width: '100%', display: 'inline-block'}}>
            <a href="/api/auth/logout">Logout</a>
            <Calendar scheduledMeals={scheduledMeals} scheduleMeal={scheduleMeal} removeMeal={removeMeal} addMealToScheduledMeal={addMealToScheduledMeal}/>
        </div>
    );
    };  

export default MobileApp;