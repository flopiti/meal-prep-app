import { useScheduledMeals } from '@/hooks/useScheduledMeals';
import styles from '../styles/Home.module.css';

export type Meal = {
    date: string;
    mealType: string;
    mealName: string;
};

const Meal = ({ meal, mealType , scheduleMeal, day} :any) => {
    console.log('render')

    const { postScheduledMeal } = useScheduledMeals();

    
    const handleDrop = (data) => {
        postScheduledMeal(data, day, mealType);
        scheduleMeal({day, mealType, data});
        console.log('done')
      };

      console.log(meal)

    return (
        <div className={styles.meal}>
            <div>{mealType}</div>
            {
                meal ? (
                    <div className={styles.mealChoice}>
                        {meal}
                    </div>
                ) : (
                    <DropZone onDrop={handleDrop}>
                        Drop here
                    </DropZone>
                )
            }
        </div>
    );
};

export default Meal;



function DropZone(props) {
    const handleDrop = (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text/plain');
      props.onDrop(data);
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    return (
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={styles.mealChoice}      >
        {props.children}
      </div>
    );
  }