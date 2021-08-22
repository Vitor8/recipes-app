import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import HeaderSearchBar from './HeaderSearchBar';

function Header({ setQuery, setCategoryId, setProductDetailId, cartProducts, shouldShowHeaderSearchBar }) {
  const [quantProductCart, setQuantProductCart] = useState(0);

  useEffect(() => {
    let quantAtCart = 0;
    cartProducts.forEach((product) => quantAtCart += product.quant_product);
    setQuantProductCart(quantAtCart);
  }, [cartProducts]);

  return (
    <header className="header-container">
      { shouldShowHeaderSearchBar
        && <HeaderSearchBar setQuery={ setQuery } setCategoryId={ setCategoryId } setProductDetailId={ setProductDetailId } />}
      <Link to="vitor8.github.io/front-end-online-store/" className="links-header">Home</Link>
      <Link to="vitor8.github.io/front-end-online-store/cart" className="links-header">Cart</Link>
      <p>{ quantProductCart }</p>
    </header>
  );
}

const mapStateToProps = (state) => ({
  cartProducts: state.cart.cartProducts,
});

export default connect(mapStateToProps)(Header);
