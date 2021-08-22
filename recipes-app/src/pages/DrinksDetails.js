import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import getMealById from '../services/getMealById';
import randomRecipe from '../services/randomRecipe';
import RecipeDetailsButton from '../components/RecipeDetailsButton';
import RecipeAppContext from '../context/RecipeAppContext';
import RenderDrinkDetails from '../components/RenderDrinkDetails';
import RenderDrinkIngred from '../components/RenderDrinkIngred';
import RenderDrinkInstruction from '../components/RenderDrinkInstruction';
import RenderDrinkRecomendation from '../components/RenderDrinkRecomendation';

const copy = require('react-copy-to-clipboard');

function DrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const [click, setClick] = useState(false);
  const {
    drink,
    setDrink,
    recomMeal,
    setRecomMeal,
    isRecipeDone,
    setIsRecipeDone,
    setInProgressRecipes,
  } = useContext(RecipeAppContext);

  function copyLink(drinkId) {
    copy(`http://localhost:3000/bebidas/${drinkId}`);
    setClick(true);
  }

  useEffect(() => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getMealDetails = async () => {
      const { drinks } = await getMealById(endpoint);
      setDrink(drinks[0]);
    };

    const getRandomMeal = async () => {
      const { meals } = await randomRecipe('themealdb');
      setRecomMeal(meals);
    };

    getMealDetails();
    getRandomMeal();
  }, []);

  function checkIsRecipeDone(arrayDoneRecipe, currentMeal) {
    const arrayLS = arrayDoneRecipe && arrayDoneRecipe.some(
      (recipe) => recipe.id === Number(currentMeal.idDrink),
    );
    return arrayLS;
  }

  function checkInRecipeInProgress(InProgress, currentMeal) {
    const arrayLS = Object.keys(InProgress);
    const checkedArray = arrayLS.some(
      (recipeID) => recipeID === currentMeal.idDrink,
    );
    return checkedArray;
  }

  useEffect(() => {
    const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const DoneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes'));
    const checkedDoneRecipes = checkIsRecipeDone(DoneRecipesLS, drink);
    setIsRecipeDone(checkedDoneRecipes);
    if (inProgressRecipesLS && !checkedDoneRecipes) {
      if (!inProgressRecipesLS.cocktails) return setInProgressRecipes(false);
      const checkedInProgressRecipes = checkInRecipeInProgress(
        inProgressRecipesLS.cocktails, drink,
      );
      setInProgressRecipes(checkedInProgressRecipes);
    }
  }, [drink]);

  return (
    <div>
      {drink && <RenderDrinkDetails copyLink={ copyLink } />}
      <span>{click ? <p>Link copiado!</p> : null}</span>
      {drink && <RenderDrinkIngred />}
      {drink && <RenderDrinkInstruction />}
      {recomMeal && <RenderDrinkRecomendation />}
      {!isRecipeDone && <RecipeDetailsButton type="bebidas" id={ id } />}
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
