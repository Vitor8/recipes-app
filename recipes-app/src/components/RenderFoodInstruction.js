import React, { useContext } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';

function RenderFoodInstruction() {
  const { meal } = useContext(RecipeAppContext);
  return (
    <div data-testid="instructions">
      <p className="recipe-details-title">Instructions</p>
      <div className="recipe-details-instruction-test">
        { meal.strInstructions }
      </div>
    </div>
  );
}

export default RenderFoodInstruction;
