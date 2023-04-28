const IngredientList = ({ ingredients }:any) => {
    return (
        <div >
            <ul className="ingredient-list">
                {ingredients.map((ingredient:any) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>
        </div>
        );
    };

export default IngredientList;