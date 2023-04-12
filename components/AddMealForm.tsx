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

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement> ) => {
        if (event.key === 'Enter') {
            if (event.target instanceof HTMLInputElement && event.target.id === 'ingredientInput') {
                addIngredient();
                event.preventDefault();
            }
        }
    };

    const isValidUrl = (url:string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const resetForm = () => {
        setMealName('');
        setIconUrl('');
        setIngredient('');
        setIngredients([]);
        setMealNameError(false);
        setIconUrlError(false);
        setIngredientError(false);
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
                const id = res.id
                addMeal({id, mealName, iconUrl, ingredients})
                closeForm();
            });
            resetForm();
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
                <input type="text" id="ingredientInput" value={ingredient} onChange={(event)=>setIngredient(event.target.value)} onKeyDown={handleKeyPress}/>
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