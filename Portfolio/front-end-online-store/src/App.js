import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="https://vitor8.github.io/front-end-online-store/" component={ Home } />
      <Route path="https://vitor8.github.io/front-end-online-store/cart" component={ Cart } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
