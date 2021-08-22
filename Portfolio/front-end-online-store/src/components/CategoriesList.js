import React from 'react';
import { connect } from 'react-redux';
import '../css/CategoriesList.css';

function CategoriesList({ categories, setCategoryId, setQuery, setProductDetailId }) {
  function setParamsAPI(id) {
    setCategoryId(id);
    setProductDetailId('');
    setQuery('');
  }

  return (
    <div className="categories-list-container">
      { categories.map((category) => (
        <button
          className="categories-list-button"
          key={ category.id }
          onClick={ () => setParamsAPI(category.id) }
        >
          { category.name }
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.cart.categories,
});

export default connect(mapStateToProps)(CategoriesList);
