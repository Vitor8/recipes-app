import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  FoodsDetails,
  DrinksDetails,
  FoodsRecipeInProgress,
  DrinksRecipeInProgress,
  Explore,
  ExploreFoods,
  ExploreDrinks,
  ExploreFoodsByIngredients,
  ExploreDrinksByIngredients,
  ExploreFoodsByArea,
  Perfil,
  RecipesDone,
  FavoriteRecipes,
  NotFound,
} from '../pages/index';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" component={ FoodsDetails } />
      <Route exact path="/bebidas/:id" component={ DrinksDetails } />
      <Route exact path="/comidas/:id/in-progress" component={ FoodsRecipeInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinksRecipeInProgress } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByArea } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Routes;
