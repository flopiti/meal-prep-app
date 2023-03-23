import { useMeals } from '@/hooks/useMeals';
import React, { useState } from 'react';

const AddMealForm = ({closeForm, addMeal}:any) => {
    const [mealName, setMealName] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState<String[]>([]);
    const [mealNameError, setMealNameError] = useState(false);
    const [iconUrlError, setIconUrlError] = useState(false);
    const [ingredientError, setIngredientError] = useState(false);

    const addIngredient = () => {
        if (!ingredient.trim() || ingredients.includes(ingredient)) {
            setIngredientError(true);
            return;
        } 
        else {
            setIngredientError(false);
        }
        setIngredients([...ingredients, ingredient]);
        setIngredient('');
    };

    const isValidUrl = (url:string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        let formValid = true;
        if (!mealName.trim()) {
            setMealNameError(true);
            formValid = false;
        } else {
            setMealNameError(false);
        }

        if (iconUrl && !isValidUrl(iconUrl)) {
            setIconUrlError(true);
            formValid = false;
        } else {
            setIconUrlError(false);
        }
        
        if (formValid) {
            createMeal({mealName, iconUrl, ingredients}).then((res) => {
                addMeal({mealName, iconUrl, ingredients})
                closeForm();
            });
        }
    }

    const {createMeal} = useMeals();
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Meal Name: 
                </label>
                <input type="text" value={mealName} onChange={(event)=>setMealName(event.target.value)} />
                {mealNameError && <span style={{color: 'red'}}>Meal name is required</span>}
            </div>
            <label>
                Icon Url:
                <input type="text" value={iconUrl} onChange={(event)=>setIconUrl(event.target.value)} />
                {iconUrlError && <span style={{color: 'red'}}>Please enter a valid URL for the icon</span>}
            </label>
            <label>
                Ingredient:
                <input type="text" value={ingredient} onChange={(event)=>setIngredient(event.target.value)} />
                {ingredientError && <span style={{color: 'red'}}>Please enter an ingredient</span>}
            </label>
            <button type="button" onClick={addIngredient}>Add Ingredient</button>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddMealForm;