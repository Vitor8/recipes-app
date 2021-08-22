import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Explore.css';

function ExploreDrinksByIngredients() {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [shouldRedirectToPageDrinks, setShouldRedirectToPageDrinks] = useState(false);
  const { setDrinksList, setToggleOn } = useContext(RecipeAppContext);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const json = await response.json();
      const { drinks } = json;
      setIngredients(drinks);
      setIsLoading(false);
    };
    fetchApi();
  }, []);

  function redirectToPageDrinks({ target: { id } }) {
    const fetchApi = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${id}`);
      const json = await response.json();
      const { drinks } = json;
      setDrinksList(drinks);
      setToggleOn(true);
      setShouldRedirectToPageDrinks(true);
    };
    fetchApi();
  }

  function renderIngredientsCard() {
    const maxLength = 12;
    const cardsIngredients = ingredients.map((ingredient, index) => {
      if (index < maxLength) {
        return (
          <div
            key={ ingredient.strIngredient1 }
            role="link"
            tabIndex={ 0 }
            data-testid={ `${index}-ingredient-card` }
            className="card-ingredients"
            id={ ingredient.strIngredient1 }
            onClick={ (event) => redirectToPageDrinks(event) }
            onKeyDown={ (event) => redirectToPageDrinks(event) }
          >
            <img id={ ingredient.strIngredient1 } alt="thumbnail drink" height="50" src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` } data-testid={ `${index}-card-img` } />
            <p
              id={ ingredient.strIngredient1 }
              data-testid={ `${index}-card-name` }
            >
              {ingredient.strIngredient1}
            </p>
          </div>
        );
      } return null;
    });
    return cardsIngredients;
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />

      <div>
        {
          isLoading
            ? <p>Carregando...</p>
            : <div className="explore-card-container">{ renderIngredientsCard() }</div>
        }
      </div>

      <span>
        { shouldRedirectToPageDrinks ? <Redirect to="/bebidas" /> : <div /> }
      </span>

      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
