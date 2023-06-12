import { useIngredients } from "@/hooks/useIngredients";
import { Ingredient } from "@/types/Ingredient";
import { Meal } from "@/types/Meal";
import { MealIngredient } from "@/types/MealIngredient";
import { useEffect, useState } from "react";
import styles from '@/styles/MealForm.module.css';

interface MealFormProps {
    meal: Meal | null;

}

const MealForm = ({meal}:MealFormProps) => {
    const {getIngredients} = useIngredients();

    const [mealName, setMealName] = useState<string>(meal ? meal.mealName : '');
    const [iconUrl, setIconUrl] = useState<string>(meal ? meal.iconUrl : '');
    const [mealIngredients, setMealIngredients] = useState<MealIngredient[]>(meal ? meal.mealIngredients : []);
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);

    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient|null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState('g');
    
    const [mealNameError, setMealNameError] = useState(false);
    const [iconUrlError, setIconUrlError] = useState(false);
    const [ingredientError, setIngredientError] = useState(false);

    useEffect(() => {
        getIngredients().then((data:Ingredient[]) =>  setAllIngredients(data));
    }, [])
    
    const addIngredient = () => {
        if (!selectedIngredient) {
            setIngredientError(true);
            return;
        } 
        setIngredientError(false);
        setMealIngredients([
            ...mealIngredients, 
            {
                id: null,
                ingredientId: selectedIngredient.id,
                ingredientName: selectedIngredient.ingredientName,
                quantity: selectedQuantity,
                unitOfMeasurement: selectedUnitOfMeasurement
            }
        ]);
        setSelectedIngredient(null);
        setSelectedQuantity(0);
        setSelectedUnitOfMeasurement('g');
    };

    return <div className={styles.box}>

    </div>
    
}

export default MealForm;