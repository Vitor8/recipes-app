import React, { useContext } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';

function RenderDrinkInstruction() {
  const { drink } = useContext(RecipeAppContext);
  return (
    <p data-testid="instructions">
      <p className="recipe-details-title">Instructions</p>
      <div className="recipe-details-instruction-test">
        { drink.strInstructions }
      </div>
    </p>
  );
}

export default RenderDrinkInstruction;
