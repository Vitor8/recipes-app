import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import RecipeAppContext from '../context/RecipeAppContext';

function FoodsSearchBar() {
  const [searchText, setSearchText] = useState('');
  const [input, setInput] = useState('');
  const { setFoodList } = useContext(RecipeAppContext);
  const history = useHistory();

  const requestFoodEndpoint = async (text) => {
    let endpoint = '';
    const alertMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    const oneCharacter = 'Sua busca deve conter somente 1 (um) caracter';

    if (input === 'ingredient') endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`;
    if (input === 'name') endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
    if (input === 'firstLetter' && searchText.length > 1) alert(oneCharacter);
    if (input === 'firstLetter') endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`;
    if (!input || !searchText) return null;
    const response = await fetch(endpoint);
    const { meals } = await response.json();
    if (meals === null) return alert(alertMsg);
    if (meals.length === 1) return history.push(`/comidas/${meals[0].idMeal}`);
    setFoodList(meals);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <br />

      <div className="options-search-bar">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="search-foods"
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ ({ target: { value } }) => setInput(value) }
          />
          Ingredientes
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            name="search-foods"
            id="name"
            value="name"
            data-testid="name-search-radio"
            onChange={ ({ target: { value } }) => setInput(value) }
          />
          Nome
        </label>

        <label htmlFor="firstLetter">
          <input
            type="radio"
            name="search-foods"
            id="firstLetter"
            value="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ ({ target: { value } }) => setInput(value) }
          />
          Primeira letra
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => requestFoodEndpoint(searchText) }
        className="button-search-bar"
      >
        Buscar
      </button>
    </div>
  );
}

export default FoodsSearchBar;
