import { useState } from "react";
import ModalX from "./ModalX";
import AddIngredientForm from "./AddIngredientForm";

const IngredientList = ({ ingredients, addIngredient }:any) => {
    const[isOpen, setIsOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsOpen(true);
      };
      
    return (
        <div >
            <ul className="ingredient-list">
                {ingredients.map((ingredient:any) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>
            <button  onClick={showModal}>+</button>
            <ModalX open={isOpen} setOpen={setIsOpen}> 
            <AddIngredientForm closeForm={setIsOpen} addIngredient={addIngredient} />
          </ModalX>
        </div>
        );
    };

export default IngredientList;