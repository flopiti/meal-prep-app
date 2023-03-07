import styles from '../styles/Home.module.css';

export type Meal = {
    date: string;
    mealType: string;
    mealName: string;
};

const Meal = ({ meal, mealType } :any) => {
    return (
        <div className={styles.meal}>
            <div>{mealType}</div>
            {
                meal ? (
                    <div className={styles.mealChoice}>
                        {meal}
                    </div>
                ) : (
                    <div className={styles.mealChoice}>
                        No meal here yet
                    </div>
                )
            }
        </div>
    );
};

export default Meal;