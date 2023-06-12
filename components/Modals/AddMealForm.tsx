import { useMeals } from '@/hooks/useMeals';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/AddMealForm.module.css';
import { useIngredients } from '@/hooks/useIngredients';
import { Autocomplete, TextField } from '@mui/material';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Ingredient } from '@/types/Ingredient';

const AddMealForm = ({closeForm, addMeal}:any) => {
    const [mealName, setMealName] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    const [ingredient, setIngredient] = useState<any>('');
    const [mealIngredients, setIngredients] = useState<any>([]);
    const [mealNameError, setMealNameError] = useState(false);
    const [iconUrlError, setIconUrlError] = useState(false);
    const [ingredientError, setIngredientError] = useState(false);
    const {getIngredients} = useIngredients();
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<any>(null);
    const [quantity, setQuantity] = useState(0);
    const [unitOfMeasurement, setUnitOfMeasurement] = useState('g');

    useEffect(() => {
        getIngredients().then((data:Ingredient[]) =>  setAllIngredients(data));
      }, [])  
    
      const addIngredient = () => {
        if (!selectedIngredient || mealIngredients.includes(selectedIngredient.ingredientName)) {
            setIngredientError(true);
            return;
        } else {
            setIngredientError(false);
        }
        setIngredients([...mealIngredients, {
            ingredientId: selectedIngredient.id,
            ingredientName: selectedIngredient.ingredientName,
            quantity,
            unitOfMeasurement
        }]);
        setSelectedIngredient(null);
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
            createMeal({mealName, iconUrl, mealIngredients}).then((res) => {
                const id = res.id
                addMeal({id, mealName, iconUrl, mealIngredients})
                closeForm();
            });
            resetForm();
        }
    }

    const {createMeal} = useMeals();
    
    return (
        <div className={styles.box}>
            <form onSubmit={handleSubmit} className={styles.formBox}>
                <div className={styles.colRow}>
                    <label>
                        Meal Name: 
                    </label>
                    <input type="text" value={mealName} onChange={(event)=>setMealName(event.target.value)} />
                    {mealNameError && <span style={{color: 'red'}}>Meal name is required</span>}
                </div>
                <div className={styles.colRow}>
                    <label>
                        Icon Url:
                    </label>
                    <input type="text" value={iconUrl} onChange={(event)=>setIconUrl(event.target.value)} />
                    {iconUrlError && <span style={{color: 'red'}}>Please enter a valid URL for the icon</span>}
                </div>
                <div className={styles.rowVert}>
                    <label>
                        Ingredients
                    </label>
                    <div className={styles.ingredientForm}>
                        <input className={styles.qtyStyle} type="text" id="quantity" value={quantity} onChange={(event)=>setQuantity(Number(event.target.value))}/>
                        <FormControl fullWidth variant="standard" sx={{ marginBottom: 2, width: 50 , display: 'inline-block' }}>
                            <InputLabel id="unitOfMeasurement-label">Unit of Measurement</InputLabel>
                            <Select
                                sx={{ width: 50 , display: 'inline-block'}}
                                labelId="unitOfMeasurement-label"
                                id="unitOfMeasurement"
                                value={unitOfMeasurement}
                                label="Unit of Measurement"
                                onChange={(event) => setUnitOfMeasurement(event.target.value)}
                            >
                                <MenuItem value="g">g</MenuItem>
                                <MenuItem value="ml">ml</MenuItem>
                                <MenuItem value="unit">unit</MenuItem>
                                <MenuItem value="tsp">tsp</MenuItem>
                                <MenuItem value="tbsp">tbsp</MenuItem>
                                <MenuItem value="cup">cup</MenuItem>
                                <MenuItem value="can">can</MenuItem>
                            </Select>
                        </FormControl>  
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={allIngredients}
                            getOptionLabel={(option:any) => option.ingredientName}
                            sx={{ width: 250 , display: 'inline-block'}}
                            renderInput={(params) => <TextField {...params} label="ingredient" />}
                            value={selectedIngredient}
                            onChange={(_, value:any) => setSelectedIngredient(value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>

                </div>
                {ingredientError && <span style={{color: 'red'}}>Please enter an ingredient</span>}

                <button type="button" onClick={addIngredient}>Add Ingredient</button>
                <ul>
                    {mealIngredients.map((ingredient:any, index:any) => (
                        <li key={index}>{ingredient.quantity} {ingredient.unitOfMeasurement} {ingredient.ingredientName}</li>
                    ))}
                </ul>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddMealForm;