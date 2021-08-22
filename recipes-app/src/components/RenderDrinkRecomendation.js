import React, { useContext } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';
import '../css/RecipeDetails.css';

function RenderDrinkRecomendation() {
  const { recomMeal } = useContext(RecipeAppContext);
  const maxLength = 6;
  const recomMealMap = recomMeal.map((recipe, index) => {
    if (index < maxLength) {
      if (index === 0 || index === 1) {
        return (
          <div
            key={ recipe.strMeal }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              height="160px"
              width="180px"
            />
            <h5 data-testid={ `${index}-recomendation-title` }>{ recipe.strMeal }</h5>
          </div>
        );
      }
      return (
        <div
          key={ recipe.strMeal }
          data-testid={ `${index}-recomendation-card` }
          className="not-visible"
        >
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            height="160px"
            width="180px"
          />
          <h5 data-testid={ `${index}-recomendation-title` }>{ recipe.strMeal }</h5>
        </div>
      );
    }
    return null;
  });
  return (
    <div>
      <p className="recipe-details-title">Recomendadas</p>
      <div className="scroll-recipes">
        { recomMealMap }
      </div>
    </div>
  );
}

export default RenderDrinkRecomendation;
