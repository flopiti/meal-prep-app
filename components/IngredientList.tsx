import { useState } from "react";
import ModalX from "./ModalX";
import AddIngredientForm from "./Modals/AddIngredientForm";
import styles from '../styles/IngredientList.module.css';

const IngredientList = ({ ingredients, addIngredient, removeIngredient }:any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);

  const showModal = () => {
    setIsOpen(true);
  };

  const scrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  }

  const scrollDown = () => {
    if (startIndex + 8 < ingredients.length) {
      setStartIndex(startIndex + 1);
    }
  }

  return (
    <div className={styles.ingredientListBox}>
      <h3 className={styles.subheader}>
        Ingredients
      </h3>
      <div className="ingredient-list">
        {ingredients?.slice(startIndex, startIndex + 8).map((ingredient:any) => (
          <li key={ingredient.id}>{ingredient.ingredientName}<button onClick={()=>removeIngredient(ingredient.id)}>X</button></li>
        ))}
      </div>
      <button onClick={scrollUp}>Scroll Up</button>
      <button onClick={scrollDown}>Scroll Down</button>
      <button onClick={showModal}>+</button>
      <ModalX open={isOpen} setOpen={setIsOpen}> 
        <AddIngredientForm closeForm={()=>setIsOpen} addIngredient={addIngredient} />
      </ModalX>
    </div>
  );
};

export default IngredientList;