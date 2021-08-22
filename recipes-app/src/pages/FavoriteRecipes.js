import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeAppContext from '../context/RecipeAppContext';
import '../css/Profile.css';

const copy = require('react-copy-to-clipboard');

function FavoriteRecipes() {
  const [click, setClick] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [shouldRender, setShouldRender] = useState(false);
  const history = useHistory();
  const {
    filteredFavoritesRecipes,
    setFilteredFavoritesRecipes,
  } = useContext(RecipeAppContext);

  function copyLink(type, id) {
    copy(`http://localhost:3000/${type}s/${id}`);
    setClick(true);
  }

  function filterFavoriteRecipes(favList, type) {
    let filteredList = [];
    switch (type) {
    case 'Food':
      filteredList = favList.filter((recipe) => recipe.type === 'comida');
      break;
    case 'Drink':
      filteredList = favList.filter((recipe) => recipe.type === 'bebida');
      break;
    default:
      filteredList = favList;
      break;
    }
    setFilteredFavoritesRecipes(filteredList);
  }

  useEffect(() => {
    const localStorageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!localStorageRecipes) return;
    filterFavoriteRecipes(localStorageRecipes, filterType);
    setShouldRender(false);
  }, [filterType, shouldRender]);

  function deleteFavoriteRecipe({ target: { id } }) {
    const localStorageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = localStorageRecipes.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setShouldRender(true);
  }

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="favorite-recipes-buttons-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="All"
          className="favorite-recipes-buttons"
          onClick={ ({ target: { name } }) => setFilterType(name) }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="Food"
          className="favorite-recipes-buttons"
          onClick={ ({ target: { name } }) => setFilterType(name) }
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="Drink"
          className="favorite-recipes-buttons"
          onClick={ ({ target: { name } }) => setFilterType(name) }
        >
          Drinks
        </button>
      </div>

      <span>{click ? <p>Link copiado!</p> : <div />}</span>

      <div className="favorite-recipes-container">
        {filteredFavoritesRecipes && filteredFavoritesRecipes.map((recipes, index) => (
          <div key={ index } className="favorite-recipes-cards">
            <input
              type="image"
              data-testid={ `${index}-horizontal-image` }
              src={ recipes.image }
              width="100%"
              height="150px"
              alt={ recipes.name }
              onClick={ () => history.push(`/${recipes.type}s/${recipes.id}`) }
            />

            <div className="recipes-card-content">
              <p
                className="profile-area-name"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipes.area} - ${recipes.category} ${recipes.alcoholicOrNot}`}
              </p>

              <a
                href={ `/${recipes.type}s/${recipes.id}` }
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/${recipes.type}s/${recipes.id}`) }
                className="profile-recipe-name"
              >
                { recipes.name }
              </a>

              <div className="profile-icons">
                <input
                  type="image"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt={ recipes.name }
                  id={ recipes.id }
                  onClick={ (e) => deleteFavoriteRecipe(e) }
                />
                <input
                  type="image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="card da receita"
                  onClick={ () => copyLink(recipes.type, recipes.id) }
                />
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
