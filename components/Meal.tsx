import styles from '../styles/Home.module.css';

const Meal = ({ meal } :any) => {
    return (
        <div className={styles.meal}>
            {meal}
        </div>
    );
};

export default Meal;