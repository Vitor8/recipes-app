import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../actions';
import '../css/ProductsList.css';

function ProductCard({ product, setProductDetailId, addProduct, setProducts, setCategoryId }) {
  function renderProductDetail(id) {
    setCategoryId('');
    setProducts([]);
    setProductDetailId(id);
  }

  return (
    <div
      key={ product.id }
      className="product-card-container"
    >
      <img src={ product.thumbnail } className="product-card-image" onClick={ () => renderProductDetail(product.id) } />
      <div className="product-card-content-text" onClick={ () => renderProductDetail(product.id) }>
        <p className="product-card-title">{ product.title }</p>
        <p className="product-card-price">
          R$:
          { product.price }
        </p>
      </div>
      <button
        type="button"
        onClick={ () => addProduct(product) }
        className="product-card-buttons-add"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => { dispatch(cartActions.addProduct(product)); },
});

export default connect(null, mapDispatchToProps)(ProductCard);
