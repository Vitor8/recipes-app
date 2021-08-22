import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeDetailsButton.css';
import { useHistory } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';

function RecipeDetailsButton({ type, id }) {
  const history = useHistory();
  const { inProgressRecipes } = useContext(RecipeAppContext);
  return (
    <button
      type="button"
      className="start-recipe-btn"
      data-testid="start-recipe-btn"
      onClick={ () => history.push(`/${type}/${id}/in-progress`) }
    >
      {!inProgressRecipes ? 'Iniciar Receita' : 'Continuar Receita'}
    </button>
  );
}

RecipeDetailsButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeDetailsButton;
