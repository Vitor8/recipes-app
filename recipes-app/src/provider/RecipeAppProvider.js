import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '../context/RecipeAppContext';
import bkHeart from '../images/blackHeartIcon.svg';
import wtHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeAppProvider({ children }) {
  const [drink, setDrink] = useState('');
  const [drinkCategoryList, setDrinkCategory] = useState('');
  const [drinksList, setDrinksList] = useState('');
  const [filteredFavoritesRecipes, setFilteredFavoritesRecipes] = useState([]);
  const [filteredRecipesDone, setFilteredRecipesDone] = useState([]);
  const [foodCategoryList, setFoodCategory] = useState('');
  const [foodsList, setFoodList] = useState('');
  const [isFavRecipe, setIsFavRecipe] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(true);
  const [inProgressRecipes, setInProgressRecipes] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [meal, setMeal] = useState('');
  const [recomMeal, setRecomMeal] = useState('');
  const [recomDrink, setRecomDrink] = useState('');
  const [toggleOn, setToggleOn] = useState(false);

  function checkFavoriteDrink() {
    const { idDrink } = drink;
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favRecipes) return;
    const checkedRecipe = favRecipes.some(
      (recipe) => recipe.id === idDrink,
    );
    if (checkedRecipe) setIsFavRecipe(checkedRecipe);
  }

  function saveFavoriteDrink() {
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = drink;
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) favoriteRecipes = [];
    const checkIsFavorited = favoriteRecipes.some((recipe) => recipe.id === idDrink);
    if (checkIsFavorited) {
      console.log('é verdadeiro');
      const newFavRecipe = favoriteRecipes.filter((recipe) => recipe.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipe));
      setIsFavRecipe(false);
    }
    if (!checkIsFavorited) {
      const newFavoriteRecipe = [
        ...favoriteRecipes,
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipe));
      setIsFavRecipe(true);
    }
  }

  function saveFavoriteMeal() {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = meal;
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) favoriteRecipes = [];
    const checkIsFavorited = favoriteRecipes.some((recipes) => recipes.id === idMeal);
    if (checkIsFavorited) {
      const newFavRecipe = favoriteRecipes.filter((recipes) => recipes.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipe));
      setIsFavRecipe(false);
    }
    if (!checkIsFavorited) {
      const newFavoriteRecipe = [
        ...favoriteRecipes,
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipe));
      setIsFavRecipe(true);
    }
  }

  function checkFavoriteMeal() {
    const { idMeal } = meal;
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favRecipes) return;
    const checkedRecipe = favRecipes.some(
      (recipe) => recipe.id === idMeal,
    );
    if (checkedRecipe) setIsFavRecipe(checkedRecipe);
  }

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const handleDisabled = () => {
    const minLength = 6;
    const validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailIsValid = validRegex.test(login.email);
    if (emailIsValid && login.password.length > minLength) {
      return false;
    }
    return true;
  };

  const data = {
    bkHeart,
    checkFavoriteDrink,
    checkFavoriteMeal,
    drink,
    drinksList,
    drinkCategoryList,
    email: login.email,
    filteredFavoritesRecipes,
    foodCategoryList,
    foodsList,
    handleChange,
    handleDisabled,
    isFavRecipe,
    inProgressRecipes,
    isRecipeDone,
    meal,
    filteredRecipesDone,
    recomDrink,
    recomMeal,
    saveFavoriteDrink,
    saveFavoriteMeal,
    setDrink,
    setDrinksList,
    setDrinkCategory,
    setFilteredFavoritesRecipes,
    setFoodCategory,
    setFoodList,
    setInProgressRecipes,
    setIsFavRecipe,
    setIsRecipeDone,
    setLogin,
    setMeal,
    setFilteredRecipesDone,
    setRecomDrink,
    setRecomMeal,
    setToggleOn,
    shareIcon,
    toggleOn,
    wtHeart,
  };

  return (
    <RecipeAppContext.Provider value={ data }>
      { children }
    </RecipeAppContext.Provider>
  );
}

RecipeAppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.array),
}.isRequire;

export default RecipeAppProvider;
