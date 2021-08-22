import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import getMealById from '../services/getMealById';
import randomRecipe from '../services/randomRecipe';
import RecipeDetailsButton from '../components/RecipeDetailsButton';
import RecipeAppContext from '../context/RecipeAppContext';
import RenderFoodDetails from '../components/RenderFoodDetails';
import RenderFoodIngred from '../components/RenderFoodIngred';
import RenderFoodInstruction from '../components/RenderFoodInstruction';
import RenderFoodVideo from '../components/RenderFoodVideo';
import RenderFoodRecomendation from '../components/RenderFoodRecomendation';

const copy = require('react-copy-to-clipboard');

function FoodsDetails(props) {
  const { match: { params: { id } } } = props;
  const [click, setClick] = useState(false);
  const {
    meal,
    setMeal,
    recomDrink,
    setRecomDrink,
    setIsRecipeDone,
    isRecipeDone,
    setInProgressRecipes,
  } = useContext(RecipeAppContext);

  function copyLink(drinkId) {
    copy(`http://localhost:3000/comidas/${drinkId}`);
    setClick(true);
  }

  useEffect(() => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getMealDetails = async () => {
      const { meals } = await getMealById(endpoint);
      setMeal(meals[0]);
    };

    const getRandomMeal = async () => {
      const { drinks } = await randomRecipe('thecocktaildb');
      setRecomDrink(drinks);
    };

    getMealDetails();
    getRandomMeal();
  }, []);

  function checkIsRecipeDone(arrayDoneRecipe, currentMeal) {
    const arrayLS = arrayDoneRecipe && arrayDoneRecipe.some(
      (recipe) => recipe.id === Number(currentMeal.idMeal),
    );
    return arrayLS;
  }

  function checkInRecipeInProgress(InProgress, currentMeal) {
    const arrayLS = Object.keys(InProgress);
    const checkedArray = arrayLS.some(
      (recipeID) => recipeID === currentMeal.idMeal,
    );
    return checkedArray;
  }

  useEffect(() => {
    const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const DoneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes'));
    const checkedDoneRecipes = checkIsRecipeDone(DoneRecipesLS, meal);
    setIsRecipeDone(checkedDoneRecipes);
    if (inProgressRecipesLS && !checkedDoneRecipes) {
      if (!inProgressRecipesLS.meals) return setInProgressRecipes(false);
      const checkedInProgressRecipes = checkInRecipeInProgress(
        inProgressRecipesLS.meals, meal,
      );
      setInProgressRecipes(checkedInProgressRecipes);
    }
  }, [meal]);

  return (
    <div>
      {meal && <RenderFoodDetails copyLink={ copyLink } />}
      <span>{click ? <p>Link copiado!</p> : null}</span>
      {meal && <RenderFoodIngred />}
      {meal && <RenderFoodInstruction />}
      {meal && <RenderFoodVideo />}
      {recomDrink && <RenderFoodRecomendation />}
      {!isRecipeDone && <RecipeDetailsButton type="comidas" id={ id } />}
    </div>
  );
}

FoodsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodsDetails;
