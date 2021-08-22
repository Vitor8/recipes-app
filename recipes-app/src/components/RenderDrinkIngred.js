import React, { useContext } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';

function RenderDrinkIngred() {
  const { drink } = useContext(RecipeAppContext);
  function createIngredArray() {
    const ingredArray = Object.entries(drink)
      .filter((key) => key[0].includes('strIngredient'));
    const ingredList = [];
    ingredArray.forEach((item) => ingredList.push(item[1]));
    return ingredList;
  }

  function createMeasuArray() {
    const measureArray = Object.entries(drink)
      .filter((key) => key[0].includes('strMeasure'));
    const measureList = [];
    measureArray.forEach((item) => measureList.push(item[1]));
    return measureList;
  }

  const ingredList = createIngredArray();
  const measureList = createMeasuArray();

  return (
    <div>
      <p className="recipe-details-title">Ingredients</p>
      <ul className="recipe-details-ingredients-list">
        {ingredList.map((ingred, index) => {
          if (ingred) {
            return (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingred} - ${measureList[index]}`}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

export default RenderDrinkIngred;
