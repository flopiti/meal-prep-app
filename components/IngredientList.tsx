import { useEffect, useState } from "react";
import ModalX from "./ModalX";
import AddIngredientForm from "./Modals/AddIngredientForm";
import styles from "../styles/IngredientList.module.css";
import { useIngredients } from "@/hooks/useIngredients";

const IngredientList = () => {
  const { getIngredients, createIngredient, removeIngredient } =
    useIngredients();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const showModal = () => {
    setIsOpen(true);
  };

  const scrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const scrollDown = () => {
    if (startIndex + 7 < ingredients.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const addIngredient = async (ingredient: any) => {
    setIngredients([...ingredients, ingredient]);
    setIsOpen(false);
  };
  useEffect(() => {
    getIngredients()
      .then((data: any) => {
        setLoading(false);
        setIngredients(data);
      })
      .catch((err: any) => {
        setError(err);
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.ingredientListBox}>
      <h3 className={styles.subheader}>Ingredients</h3>
      <div className="ingredient-list">
        {ingredients
          ?.slice(startIndex, startIndex + 7)
          .map((ingredient: any) => (
            <li key={ingredient.id}>
              {ingredient.ingredientName}
              <button onClick={() => removeIngredient(ingredient.id)}>X</button>
            </li>
          ))}
      </div>
      <div className={styles.buttons}>
        <button onClick={scrollUp}>Scroll Up</button>
        <button onClick={scrollDown}>Scroll Down</button>
        <button onClick={showModal}>+</button>
      </div>
      <ModalX open={isOpen} setOpen={setIsOpen}>
        <AddIngredientForm
          closeForm={() => setIsOpen}
          addIngredient={addIngredient}
        />
      </ModalX>
    </div>
  );
};

export default IngredientList;
