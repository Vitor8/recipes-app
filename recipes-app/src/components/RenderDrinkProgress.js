import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeInProgress.css';
import '../css/RecipeDetails.css';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeAppContext from '../context/RecipeAppContext';

const copy = require('react-copy-to-clipboard');

function RenderDrinkProgress({ strDrinkThumb, strDrink, strCategory,
  strInstructions, id, finalListIngredients,
  classNameIngredients, statusIngredients, statusEndRecipeButton,
  favoriteIcon, setFavoriteIcon, setHasChecked,
  setStatusIngredients, setClassNameIngredients,
  setCountCheckIngredList, countCheckIngredList,
  numberIngredients, setStatusEndRecipeButton, hasChecked, strAlcoholic }) {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const {
    setFilteredRecipesDone,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    if (hasChecked) {
      const currentLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes')); // pego o LocalStorage atual
      const newObject = {
        ...currentLocalStorage,
        cocktails: {
          ...currentLocalStorage.cocktails,
          [id]: statusIngredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
    }
  }, [statusIngredients]);

  useEffect(() => {
    if ((countCheckIngredList === numberIngredients)) {
      return setStatusEndRecipeButton(false);
    }
    return setStatusEndRecipeButton(true);
  }, [countCheckIngredList, numberIngredients]);

  function checkList(index) {
    setHasChecked(true);
    const currentStatusIngredients = [...statusIngredients];
    if (statusIngredients[index] === true) {
      currentStatusIngredients[Number(index)] = false;
      setStatusIngredients(currentStatusIngredients);
      setClassNameIngredients((prev) => ({ ...prev, [index]: 'notChecked' }));
      const newCount = countCheckIngredList - 1;
      return setCountCheckIngredList(newCount);
    }
    currentStatusIngredients[Number(index)] = true;
    setStatusIngredients(currentStatusIngredients);
    setClassNameIngredients((prev) => ({ ...prev, [index]: 'yesChecked' }));
    const newCount = countCheckIngredList + 1;
    return setCountCheckIngredList(newCount);
  }

  function copyLink(index) {
    copy(`http://localhost:3000/bebidas/${index}`);
    setClick(true);
  }

  function changeStatusIcon() {
    if (favoriteIcon === whiteHeartIcon) {
      setFavoriteIcon(blackHeartIcon);
      let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (!favoriteRecipes) favoriteRecipes = [];
      const newFavoriteRecipes = [
        ...favoriteRecipes,
        {
          id,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    if (favoriteIcon === blackHeartIcon) {
      setFavoriteIcon(whiteHeartIcon);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    }
  }

  function createIngredArray() {
    const finalList = finalListIngredients.map((ingredient, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        className={ classNameIngredients[index] }
      >
        {ingredient}
        <input
          type="checkbox"
          id={ index }
          checked={ statusIngredients[index] }
          onClick={ (event) => checkList(event.target.id) }
        />
      </li>
    ));
    return (
      <ul className="recipe-details-ingredients-list">{ finalList }</ul>
    );
  }

  function saveRecipeDoneInLocalStorage() {
    const currentLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || []; // pego o LocalStorage atual
    const newRecipeDone = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: '18/08/2021',
      tags: [],
    };
    const newRecipesDone = [
      ...currentLocalStorage,
      newRecipeDone,
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(newRecipesDone));
    setFilteredRecipesDone(newRecipesDone);
    return history.push('/receitas-feitas');
  }

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        width="360px"
        height="300px"
        data-testid="recipe-photo"
      />
      <span>
        { click ? <p>Link copiado!</p> : null }
      </span>
      <div className="recipe-details-legend">
        <h3 data-testid="recipe-title">{ strDrink }</h3>
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt="compartilhar"
          onClick={ () => copyLink(id) }
        />
        <input
          type="image"
          data-testid="favorite-btn"
          src={ favoriteIcon }
          alt="botão favoritar"
          onClick={ () => changeStatusIcon() }
        />
      </div>
      <p
        data-testid="recipe-category"
        className="recipe-details-category"
      >
        { strCategory }
      </p>
      <div>
        <p className="recipe-details-title">Ingredients</p>
        <span>
          { createIngredArray() }
        </span>
      </div>
      <div>
        <p className="recipe-details-title">Instructions</p>
        <p
          data-testid="instructions"
          className="recipe-details-instruction-test"
        >
          { strInstructions }
        </p>
      </div>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ statusEndRecipeButton }
        onClick={ () => saveRecipeDoneInLocalStorage() }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RenderDrinkProgress.propTypes = {
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  strAlcoholic: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  finalListIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  classNameIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  statusIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  statusEndRecipeButton: PropTypes.bool.isRequired,
  favoriteIcon: PropTypes.string.isRequired,
  setFavoriteIcon: PropTypes.func.isRequired,
  setHasChecked: PropTypes.func.isRequired,
  setStatusIngredients: PropTypes.func.isRequired,
  setClassNameIngredients: PropTypes.func.isRequired,
  setCountCheckIngredList: PropTypes.func.isRequired,
  countCheckIngredList: PropTypes.number.isRequired,
  numberIngredients: PropTypes.number.isRequired,
  setStatusEndRecipeButton: PropTypes.func.isRequired,
  hasChecked: PropTypes.bool.isRequired,
};

export default RenderDrinkProgress;
