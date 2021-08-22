import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';
import Footer from '../components/Footer';
import RecipeAppContext from '../context/RecipeAppContext';

function Foods() {
  const { setFoodList, toggleOn } = useContext(RecipeAppContext);

  useEffect(() => {
    if (!toggleOn) {
      const foodEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      fetch(foodEndpoint)
        .then((response) => response.json())
        .then((results) => setFoodList(results.meals));
    }
  }, [toggleOn]);

  return (
    <>
      <Header title="Comidas" icon foods />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default Foods;
