import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import getCategories from '../services/categoriesAPI';
import getCategory from '../services/categoryAPI';
import RecipeAppContext from '../context/RecipeAppContext';
import '../css/Header.css';

function CategoryButtons({ foods, drinks }) {
  const { setFoodCategory,
    setDrinkCategory,
    drinkCategoryList,
    foodCategoryList,
    setDrinksList,
    setFoodList,
    setToggleOn,
    toggleOn,
  } = useContext(RecipeAppContext);
  const [btnName, setBtnName] = useState('');

  useEffect(() => {
    const foodCatEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const drinkCatEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    if (foods) {
      const getCategoriesFromAPI = async () => {
        const { meals } = await getCategories(foodCatEndpoint);
        setFoodCategory(meals);
      };
      getCategoriesFromAPI();
    } else if (drinks) {
      const getCategoriesFromAPI = async () => {
        const data = await getCategories(drinkCatEndpoint);
        const drinkCategory = data.drinks;
        setDrinkCategory(drinkCategory);
      };
      getCategoriesFromAPI();
    }
  }, []);

  const filterDrinkCategory = async ({ target }) => {
    const { name } = target;
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
    if (!toggleOn) {
      const data = await getCategory(endpoint);
      setDrinksList(data.drinks);
      setBtnName(name);
      setToggleOn(true);
    } if (toggleOn && name === btnName) {
      setToggleOn(false);
    } if (toggleOn && name !== btnName) {
      const data = await getCategory(endpoint);
      setDrinksList(data.drinks);
      setBtnName(name);
    }
  };

  const filterFoodCategory = async ({ target }) => {
    const { name } = target;
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
    if (!toggleOn) {
      const data = await getCategory(endpoint);
      setFoodList(data.meals);
      setBtnName(name);
      setToggleOn(true);
    } if (toggleOn && name === btnName) {
      setToggleOn(false);
    } if (toggleOn && name !== btnName) {
      const data = await getCategory(endpoint);
      setFoodList(data.meals);
      setBtnName(name);
    }
  };

  const renderDrinkCategoryButton = (type) => {
    const maxLength = 4;
    const list = type.map((category, index) => {
      if (index <= maxLength) {
        return (
          <button
            type="button"
            key={ index }
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ (e) => filterDrinkCategory(e) }
            className="button-food"
          >
            {`${category.strCategory}`}
          </button>
        );
      }
      return null;
    });
    return list;
  };

  const renderFoodCategoryButton = (type) => {
    const maxLength = 4;
    const list = type.map((category, index) => {
      if (index <= maxLength) {
        return (
          <button
            type="button"
            key={ index }
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ (e) => filterFoodCategory(e) }
            className="button-food"
          >
            {`${category.strCategory}`}
          </button>
        );
      }
      return null;
    });
    return list;
  };

  const renderAllButton = () => (
    <button
      type="button"
      onClick={ () => setToggleOn(false) }
      data-testid="All-category-filter"
      className="button-food"
    >
      All
    </button>
  );

  return (
    <div className="category-buttons">
      {foods && renderAllButton()}
      {foods && foodCategoryList && renderFoodCategoryButton(foodCategoryList)}
      {drinks && renderAllButton()}
      {drinks && drinkCategoryList && renderDrinkCategoryButton(drinkCategoryList)}
    </div>
  );
}

CategoryButtons.propTypes = {
  foods: PropTypes.bool.isRequired,
  drinks: PropTypes.bool.isRequired,
};

export default CategoryButtons;
