import styles from './MealCard.module.css';
import Image from 'next/image'

const MealCard = ({meal}:any) => {
    return (
        <div className={styles.mealCardContainer}>
            <p>{meal.mealName}</p>
            {meal?.iconUrl ?  <Image src={meal.iconUrl} alt="food" width={100} height={100} /> : <span></span>}
        </div>
    );
};

export default MealCard;