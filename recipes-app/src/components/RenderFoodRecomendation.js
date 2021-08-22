import React, { useContext } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';
import '../css/RecipeDetails.css';

function RenderFoodRecomendation() {
  const { recomDrink } = useContext(RecipeAppContext);
  const maxLength = 6;
  const recomDrinkMap = recomDrink.map((recipe, index) => {
    if (index < maxLength) {
      if (index === 0 || index === 1) {
        return (
          <div
            key={ recipe.strDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              height="160px"
              width="180px"
            />
            <h5 data-testid={ `${index}-recomendation-title` }>{ recipe.strDrink }</h5>
          </div>
        );
      }
      return (
        <div
          key={ recipe.strDrink }
          data-testid={ `${index}-recomendation-card` }
          className="not-visible"
        >
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            height="160px"
            width="180px"
          />
          <h5 data-testid={ `${index}-recomendation-title` }>{ recipe.strDrink }</h5>
        </div>
      );
    }
    return null;
  });
  return (
    <div>
      <p className="recipe-details-title">Recomendadas</p>
      <div className="scroll-recipes">
        { recomDrinkMap }
      </div>
    </div>
  );
}

export default RenderFoodRecomendation;
