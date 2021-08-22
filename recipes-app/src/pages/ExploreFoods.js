import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [idMeal, setIdMeal] = useState('');

  async function fetchApiSurprise() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const json = await response.json();
    const { meals } = json;
    const meal = meals[0];
    setIdMeal(meal.idMeal);
    setShouldRedirect(true);
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="explore-container">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="button-explore"
          >
            Por Ingredientes
          </button>
        </Link>
        <br />

        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            className="button-explore"
          >
            Por Local de Origem
          </button>
        </Link>
        <br />

        <button
          type="button"
          data-testid="explore-surprise"
          className="button-explore"
          onClick={ () => fetchApiSurprise() }
        >
          Me Surpreenda!
        </button>

        <span>
          { shouldRedirect ? <Redirect to={ `/comidas/${idMeal}` } /> : <div /> }
        </span>
      </div>

      <Footer />
    </div>
  );
}

export default ExploreFoods;
