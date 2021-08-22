import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Explore.css';

function ExploreFoodsByArea() {
  const [isLoading, setIsLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [chosenArea, setChosenArea] = useState('');
  const [recipesChosenArea, setRecipesChosenArea] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const json = await response.json();
      const { meals } = json;
      setChosenArea(meals[0].strArea);
      setAreas(meals);
      setIsLoading(false);
    };
    fetchApi();
  }, []);

  function renderRecipesByArea() {
    const fetchApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${chosenArea}`);
      const json = await response.json();
      setRecipesChosenArea(json.meals);
    };
    fetchApi();

    const maxLength = 12;

    const recipes = recipesChosenArea.map((recipe, index) => {
      if (index < maxLength) {
        return (
          <Link key={ recipe.idMeal } to={ `/comidas/${recipe.idMeal}` }>
            <div className="card-ingredients" data-testid={ `${index}-recipe-card` }>
              <img
                height="50"
                alt="recipe"
                src={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` } className="name-recipe-area">
                { recipe.strMeal }
              </p>
            </div>
          </Link>
        );
      } return null;
    });

    return recipes;
  }

  function renderDropDownAreas() {
    const options = areas.map((area) => (
      <option
        key={ area.strArea }
        value={ area.strArea }
        data-testid={ `${area.strArea}-option` }
      >
        {area.strArea}
      </option>
    ));

    const allOption = (
      <option data-testid="All-option" value={ areas[0].strArea }>
        All
      </option>
    );

    return (
      <select
        onChange={ (event) => setChosenArea(event.target.value) }
        data-testid="explore-by-area-dropdown"
        className="explore-select-dropdown"
      >
        { options }
        { allOption }
      </select>
    );
  }

  return (
    <div>
      <Header title="Explorar Origem" icon />

      <span>
        {
          isLoading
            ? <div />
            : <div className="dropdown-areas">{ renderDropDownAreas() }</div>
        }
        {' '}
      </span>

      <span>
        {
          isLoading
            ? <p>Carregando Receitas...</p>
            : <div className="explore-card-container">{ renderRecipesByArea() }</div>
        }
      </span>

      <Footer />
    </div>
  );
}

export default ExploreFoodsByArea;
