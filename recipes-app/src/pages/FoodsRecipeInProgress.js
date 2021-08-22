import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeInProgress.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RenderFoodProgress from '../components/RenderFoodProgress';

function FoodsRecipeInProgress({ match: { params: { id } } }) {
  const [mealInProgress, setMealInProgress] = useState('');
  const [loading, setIsLoading] = useState(true);
  const [finalListIngredients, setFinalListIngredients] = useState();
  const [classNameIngredients, setClassNameIngredients] = useState([]);
  const [statusIngredients, setStatusIngredients] = useState([]);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const [hasChecked, setHasChecked] = useState(false);
  const [statusEndRecipeButton, setStatusEndRecipeButton] = useState(true);
  const [countCheckIngredList, setCountCheckIngredList] = useState(0);
  const [numberIngredients, setNumberIngredients] = useState(0);
  const ingredListClass = [];
  const ingredList = [];

  useEffect(() => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getMealDetails = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const { meals } = data;
      setMealInProgress(meals[0]);
    };
    getMealDetails();
  }, []);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);
    if (isFavorite) setFavoriteIcon(blackHeartIcon);
  }, []);

  useEffect(() => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || []; // senão tiver nada é um array vazio
    const ingredArray = Object.entries(mealInProgress)
      .filter((key) => key[0].includes('strIngredient') && key[1]);
    ingredArray.forEach((item) => ingredList.push(item[1]));

    if (inProgressRecipes && !inProgressRecipes.meals) {
      const arrayStatus = [];
      ingredArray.forEach(() => {
        ingredListClass.push('notChecked');
        arrayStatus.push(false); // crio um array mesmo tamanho de n ingredientes
      });
      inProgressRecipes = {
        ...inProgressRecipes,
        meals: {
          [id]: arrayStatus,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }

    const meals = inProgressRecipes.meals || { meals: {} };
    let countYesChecked = 0;
    const statusIngredSaved = meals[id] || [];
    statusIngredSaved.forEach((item) => { // vou passar pelo array de status da comida atual, para criar o check css no item
      if (item) {
        countYesChecked += 1;
        ingredListClass.push('yesChecked');
      } else {
        ingredListClass.push('notChecked');
      }
    });
    setCountCheckIngredList(countYesChecked);
    setStatusIngredients(statusIngredSaved);
    setNumberIngredients(ingredList.length);
    setClassNameIngredients(ingredListClass);
    setFinalListIngredients(ingredList);
    setIsLoading(false);
    setFinalListIngredients(ingredList);
  }, [mealInProgress]);

  function renderComponentFoodProgress() {
    return (
      <div>
        <RenderFoodProgress
          strMealThumb={ mealInProgress.strMealThumb }
          strMeal={ mealInProgress.strMeal }
          strCategory={ mealInProgress.strCategory }
          strInstructions={ mealInProgress.strInstructions }
          strArea={ mealInProgress.strArea }
          id={ id }
          finalListIngredients={ finalListIngredients }
          classNameIngredients={ classNameIngredients }
          statusIngredients={ statusIngredients }
          statusEndRecipeButton={ statusEndRecipeButton }
          favoriteIcon={ favoriteIcon }
          setFavoriteIcon={ setFavoriteIcon }
          setHasChecked={ setHasChecked }
          setStatusIngredients={ setStatusIngredients }
          setClassNameIngredients={ setClassNameIngredients }
          setCountCheckIngredList={ setCountCheckIngredList }
          countCheckIngredList={ countCheckIngredList }
          numberIngredients={ numberIngredients }
          setStatusEndRecipeButton={ setStatusEndRecipeButton }
          hasChecked={ hasChecked }
          strTags={ mealInProgress.strTags }
        />
      </div>
    );
  }

  return (
    <div>
      <span>
        { loading ? <p>Carregando...</p> : renderComponentFoodProgress() }
      </span>
    </div>
  );
}

FoodsRecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodsRecipeInProgress;
