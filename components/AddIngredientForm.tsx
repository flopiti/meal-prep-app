import React, { useState } from 'react';
import styles from '../styles/AddMealForm.module.css';
import { useIngredients } from '@/hooks/useIngredients';

const AddIngredientForm = ({closeForm, addIngredient}:any) => {

    const [ingredientName, setIngredientName] = useState('');
    const [ingredientNameError, setIngredientNameError] = useState(false);
    const { createIngredient } = useIngredients();

    const handleSubmit = (event:any) => {
        event.preventDefault();
        let formValid = true;

        if (!ingredientName.trim()) {
            setIngredientNameError(true);
            formValid = false;
        } else {
            setIngredientNameError(false);
        }
        if (formValid) {
            console.log(ingredientName)
            createIngredient({name:ingredientName}).then((res) => {
                console.log(res)
                addIngredient(res)
                closeForm();
            });
            resetForm();
        }
    }

    const resetForm = () => {
        setIngredientName('');
        setIngredientNameError(false);
    }        
    
    return (
        <form onSubmit={handleSubmit} className={styles.formBox}>
            <div>
                <label>
                    Ingredient Name: 
                </label>
                <input type="text" value={ingredientName} onChange={(event)=>setIngredientName(event.target.value)} />
                {ingredientNameError && <span style={{color: 'red'}}>Ingredient name is required</span>}
            </div>

            <button type="submit">Add</button>
        </form>
    );
};

export default AddIngredientForm;