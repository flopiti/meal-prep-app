import ModalX from '../ModalX';
import EditMealForm from '../Modals/EditMealForm';
import styles from './MealCard.module.css';
import Image from 'next/image'

const MealCard = ({meal, setChosenMeal, showModal, editMealState, deleteMeal, isOpen, setIsOpen, chosenMeal}:any) => {
    return (
        <div className={styles.mealCardContainer}>
            <p>{meal.mealName}</p>
            {meal?.iconUrl ?  <Image src={meal.iconUrl} alt="food" width={100} height={100} /> : <span></span>}
            <button onClick={() => deleteMeal(meal.id)}>Delete</button>
                <button onClick={() => {
                    setChosenMeal(meal)
                    showModal()
                }}>Edit</button>
                <ModalX open={isOpen} setOpen={setIsOpen}> 
                    <EditMealForm closeForm={()=>setIsOpen} meal={chosenMeal} editMeal={editMealState} />
                </ModalX>
        </div>
    );
};

export default MealCard;