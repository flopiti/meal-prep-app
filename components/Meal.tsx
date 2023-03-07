import styles from '../styles/Home.module.css';

const Meal = ({ meal } :any) => {
    return (
        <div className={styles.meal}>
            <div>{meal}</div>
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