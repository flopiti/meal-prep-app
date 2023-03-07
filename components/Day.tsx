import styles from '@/styles/Home.module.css';

const Day = ({ day } :any) => {
    
    return (
        <div
        className={styles.day}>
        {day}
        </div>
    );
    };

export default Day;