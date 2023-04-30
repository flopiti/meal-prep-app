import { useState } from "react";
import ModalX from "./ModalX";
import AddIngredientForm from "./AddIngredientForm";
import styles from '../styles/IngredientList.module.css';

const IngredientList = ({ ingredients, addIngredient, removeIngredient }:any) => {
    const[isOpen, setIsOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsOpen(true);
      };
      
    return (
        <div className={styles.ingredientListBox}>
            <h3 className={styles.subheader}>
                Ingredients
            </h3>
            <ul className="ingredient-list">
                {ingredients?.map((ingredient:any) => (
                    <li key={ingredient.id}>{ingredient.ingredientName}<button onClick={()=>removeIngredient(ingredient.id)}>X</button></li>
                ))}
            </ul>
            <button  onClick={showModal}>+</button>
            <ModalX open={isOpen} setOpen={setIsOpen}> 
            <AddIngredientForm closeForm={()=>setIsOpen} addIngredient={addIngredient} />
          </ModalX>
        </div>
        );
    };

export default IngredientList;