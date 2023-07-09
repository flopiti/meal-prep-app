import React, { useState } from 'react';
import styles from '../styles/MealList.module.css';
import Image from 'next/image';
import XButton from './Utils/Xbutton/Xbutton';
import { motion } from 'framer-motion';
interface MealItemProps {
    meal: any;
    liked: boolean;
    onLikeChange: () => void;
    removeMealFromList:any;
}

const MealItem: React.FC<MealItemProps> = ({ meal, liked, onLikeChange , removeMealFromList}) => {
    const [showIngredients, setShowIngredients] = useState(false);

    const handleMouseEnter = () => {
        setShowIngredients(true);
    };

    const handleMouseLeave = () => {
        setShowIngredients(false);
    };

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };
    return (
        <div className={styles.fullBox}>
            <motion.div className={styles.buttonContainer}
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ duration: 2 }}
        >
                <XButton onClick={()=>removeMealFromList(meal.id)}>X</XButton>
        </motion.div>  
            <li
            className={styles.mealItem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className={styles.nameAndImage}>
                {meal.mealName}
                {meal.iconUrl && <Image src={meal.iconUrl} alt={''} className={styles.iconSmall} width={40} height={40} />}
            </span>
            {showIngredients && meal.mealIngredients.length > 0 && (
                <div className={styles.ingredientsBox}>
                    <ul>
                        {meal.mealIngredients?.map((ingredient: any, index: number) => 
                        <li key={index}>
                            {ingredient.quantity}{ingredient.unitOfMeasurement} {ingredient.ingredientName}
                        </li>)
                        }
                    </ul>
                </div>
            )}
            </li>
        </div>
    );
};

export default MealItem;
