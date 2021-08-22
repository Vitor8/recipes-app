import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/RecipeCards.css';
import RecipeAppContext from '../context/RecipeAppContext';

function RecipeCards() {
  const { drinksList, foodsList } = useContext(RecipeAppContext);
  const history = useHistory();

  const redirectToDetails = (id, foods, drinks) => {
    if (foods) {
      history.push(`/comidas/${id}`);
    } if (drinks) {
      history.push(`/bebidas/${id}`);
    }
  };

  const renderDrinkCards = () => {
    const maxLength = 11;
    const list = drinksList.map((recipe, index) => {
      if (index <= maxLength) {
        return (
          <div
            className="card-container"
            data-testid={ `${index}-recipe-card` }
            key={ recipe.idDrink }
            role="link"
            tabIndex={ 0 }
            onClick={ () => redirectToDetails(recipe.idDrink, false, true) }
            onKeyDown={ () => redirectToDetails(recipe.idDrink, false, true) }
          >
            <img
              src={ recipe.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ `${recipe.strDrink}` }
              height="50px"
              width="50px"
            />
            <p
              key={ recipe.idDrink }
              data-testid={ `${index}-card-name` }
              className="p-text"
            >
              {recipe.strDrink}
            </p>
          </div>
        );
      }
      return null;
    });
    return list;
  };

  const renderFoodCards = () => {
    const maxLength = 11;
    const list = foodsList.map((recipe, index) => {
      if (index <= maxLength) {
        return (
          <div
            className="card-container"
            data-testid={ `${index}-recipe-card` }
            key={ recipe.idMeal }
            role="link"
            tabIndex={ 0 }
            onClick={ () => redirectToDetails(recipe.idMeal, true, false) }
            onKeyDown={ () => redirectToDetails(recipe.idMeal, true, false) }
          >
            <img
              src={ recipe.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ `${recipe.strMeal}` }
              height="50px"
              width="50px"
            />
            <p
              key={ recipe.idMeal }
              data-testid={ `${index}-card-name` }
              className="p-text"
            >
              {recipe.strMeal}
            </p>
          </div>
        );
      }
      return null;
    });
    return list;
  };

  return (
    <div className="library-card-container">
      {drinksList && renderDrinkCards()}
      {foodsList && renderFoodCards()}
    </div>
  );
}

export default RecipeCards;
