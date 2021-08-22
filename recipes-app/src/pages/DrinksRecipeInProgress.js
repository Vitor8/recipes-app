import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeInProgress.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RenderDrinkProgress from '../components/RenderDrinkProgress';

function DrinksRecipeInProgress({ match: { params: { id } } }) {
  const [drinkInProgress, setDrinkInProgress] = useState('');
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
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getDrinkDetails = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const { drinks } = data;
      setDrinkInProgress(drinks[0]);
    };
    getDrinkDetails();
  }, []);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);
    if (isFavorite) setFavoriteIcon(blackHeartIcon);
  }, []);

  useEffect(() => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || []; // senão tiver nada é um array vazio
    const ingredArray = Object.entries(drinkInProgress)
      .filter((key) => key[0].includes('strIngredient') && key[1]);
    ingredArray.forEach((item) => ingredList.push(item[1]));

    if (inProgressRecipes && !inProgressRecipes.cocktails) {
      const arrayStatus = [];
      ingredArray.forEach(() => {
        ingredListClass.push('notChecked');
        arrayStatus.push(false); // crio um array mesmo tamanho de n ingredientes
      });
      inProgressRecipes = {
        ...inProgressRecipes,
        cocktails: {
          [id]: arrayStatus,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }

    const cocktails = inProgressRecipes.cocktails || { cocktails: {} };
    let countYesChecked = 0;
    const statusIngredSaved = cocktails[id] || [];
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
  }, [drinkInProgress]);

  function renderComponentDrinkProgress() {
    return (
      <div>
        <RenderDrinkProgress
          strDrinkThumb={ drinkInProgress.strDrinkThumb }
          strDrink={ drinkInProgress.strDrink }
          strCategory={ drinkInProgress.strCategory }
          strInstructions={ drinkInProgress.strInstructions }
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
          strAlcoholic={ drinkInProgress.strAlcoholic }
        />
      </div>
    );
  }

  return (
    <div>
      <span>
        { loading ? <p>Carregando...</p> : renderComponentDrinkProgress()}
      </span>
    </div>
  );
}

DrinksRecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksRecipeInProgress;
