import { useMeals } from '@/hooks/useMeals';
import React, { useState } from 'react';

const AddMealForm = ({closeForm} : any) => {
    const [mealName, setMealName] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState<String[]>([]);
    
    const addIngredient = () => {
        setIngredients([...ingredients, ingredient]);
        setIngredient('');
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        if (!mealName.trim()) {
            alert('Meal name is required');
            return;
        }

        if (iconUrl && !isValidUrl(iconUrl)) {
            alert('Please enter a valid URL for the icon');
            return;
        }
        createMeal({mealName, iconUrl, ingredients});
        closeForm();  
    }

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const {createMeal} = useMeals();
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Meal Name: 
                </label>
                <input type="text" value={mealName} onChange={(event)=>setMealName(event.target.value)} />
            </div>
            <label>
                Icon Url:
                <input type="text" value={iconUrl} onChange={(event)=>setIconUrl(event.target.value)} />
            </label>
            <label>
                Ingredient:
                <input type="text" value={ingredient} onChange={(event)=>setIngredient(event.target.value)} />
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