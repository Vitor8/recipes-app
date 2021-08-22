import React from 'react';
import '../css/Header.css';
import PropTypes from 'prop-types';
import DrinksSearchBar from './DrinksSearchBar';
import FoodsSearchBar from './FoodsSearchBar';

function SearchBar({ drinks, foods }) {
  return (
    <div className="search-container">
      {drinks && <DrinksSearchBar />}
      {foods && <FoodsSearchBar />}
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  drinks: PropTypes.bool.isRequired,
  foods: PropTypes.bool.isRequired,
};
