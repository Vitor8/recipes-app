import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../actions';
import Header from '../components/Header';
import '../css/Cart.css';
import { Redirect } from 'react-router';

function Cart({ cartProducts, addProduct, decreaseQuantProduct, removeProduct, restartState }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [shouldRenderEndComponent, setShouldRenderEndComponent] = useState(false);
  const [shouldBackHome, setShouldBackHome] = useState(false);
  const shouldShowHeaderSearchBar = false;

  useEffect(() => {
    let newTotalPrice = 0;
    cartProducts.forEach((product) => {
      const productTotalPrice = product.price * product.quant_product;
      newTotalPrice += productTotalPrice;
    });
    setTotalPrice(Math.round(newTotalPrice * 100) / 100);
  }, [cartProducts]);

  function renderProductsCart() {
    const cart = cartProducts.map((product) => (
      <div
        key={ product.id }
        className="product-cart-card-container"
      >
        <img src={ product.thumbnail } className="product-cart-image" />
        <div className="product-cart-content-text">
          <p className="product-cart-title">{ product.title }</p>
          <p className="product-cart-price">
            R$
            { product.price }
          </p>
          <p className="product-cart-quant">
            Quantidade:
            { product.quant_product }
          </p>
          <button className="buttons-cart-quant" type="button" onClick={ () => addProduct(product) }>+</button>
          <button className="buttons-cart-quant" type="button" onClick={ () => decreaseQuantProduct(product) }>-</button>
          {' '}
          <br />
          <button className="buttons-cart-remove" type="button" onClick={ () => removeProduct(product.id) }>Remover do Carrinho</button>
        </div>
      </div>
    ));
    return (
      <div className="product-cart-container">
        { cart }
      </div>
    );
  }

  function restartSession() {
    restartState();
    setShouldBackHome(true);
  }

  return (
    <div>
      { !shouldRenderEndComponent
        && <div>
          <Header shouldShowHeaderSearchBar={ shouldShowHeaderSearchBar } />
          <h3 className="product-cart-total-value">
            Valor Total: R$
            { totalPrice }
          </h3>
          { totalPrice > 0
              && <button onClick={ () => setShouldRenderEndComponent(true) } className="buttons-cart-remove">
                Finalizar Compra
              </button>}
          { cartProducts && renderProductsCart() }
           </div>}
      { shouldRenderEndComponent
        && <div className="end-container">
          <p className="end-title">Compra Finalizada com sucesso!</p>
          <p className="end-price">
            Valor Final Compra: R$
            { totalPrice }
          </p>
          <p className="end-message">Seus produtos logo chegaram na porta de sua casa!</p>
          <button
            className="buttons-cart-remove"
            onClick={ () => restartSession() }
          >
            Fazer nova compra
          </button>
           </div>}
      { shouldBackHome && <Redirect to="vitor8.github.io/front-end-online-store/" /> }
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => { dispatch(cartActions.addProduct(product)); },
  removeProduct: (id) => { dispatch(cartActions.removeProduct(id)); },
  decreaseQuantProduct: (product) => { dispatch(cartActions.decreaseQuantProduct(product)); },
  restartState: () => { dispatch(cartActions.restartState()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
