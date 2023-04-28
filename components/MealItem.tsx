import React, { useState } from 'react';
import styles from '../styles/MealList.module.css';
interface MealItemProps {
    meal: any;
    liked: boolean;
    onLikeChange: () => void;
}

const MealItem: React.FC<MealItemProps> = ({ meal, liked, onLikeChange }) => {
    const [showIngredients, setShowIngredients] = useState(false);

    const handleMouseEnter = () => {
        setShowIngredients(true);
    };

    const handleMouseLeave = () => {
        setShowIngredients(false);
    };

    return (
        <li
            className={styles.mealItem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {meal.mealName}
            <input
                type="checkbox"
                className={styles.mealCheckbox}
                checked={liked}
                onChange={onLikeChange}
            />
            {showIngredients && meal.mealIngredients.length > 0 && (
                <div className={styles.ingredientsBox}>
                    <ul>
                        {meal.mealIngredients?.map((ingredient: any, index: number) => <li key={index}>{ingredient.ingredientName}</li>)}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default MealItem;
