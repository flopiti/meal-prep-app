import ModalX from "../ModalX";
import MealForm from "../Modals/MealForm";
import styles from "./MealCard.module.css";
import Image from "next/image";

const MealCard = ({
  meal,
  setChosenMeal,
  showModal,
  editMealState,
  deleteMeal,
  isOpen,
  setIsOpen,
  chosenMeal,
}: any) => {
  return (
    <div className={styles.mealCardContainer}>
      <p>{meal.mealName}</p>
      {meal?.iconUrl ? (
        <Image src={meal.iconUrl} alt="food" width={100} height={100} />
      ) : (
        <span></span>
      )}
      <button onClick={() => deleteMeal(meal.id)}>Delete</button>
      <button
        onClick={() => {
          setChosenMeal(meal);
          showModal();
        }}
      >
        Edit
      </button>
      <ModalX open={isOpen} setOpen={setIsOpen}>
        <MealForm
          closeForm={() => setIsOpen}
          meal={chosenMeal}
          editMeal={editMealState}
          addMeal={null}
        />
      </ModalX>
    </div>
  );
};

export default MealCard;
