import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../actions';
import '../css/ProductDetail.css';

function ProductDetail({ productDetailId, addProduct }) {
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductDetail = async () => {
      const response = await fetch(`https://api.mercadolibre.com/items?ids=${productDetailId}`);
      const json = await response.json();
      const newProductDetail = json[0].body;
      setProductDetail(newProductDetail);
      setIsLoading(false);
    };
    getProductDetail();
  }, [productDetailId]);

  function renderCardProductDetail() {
    return (
      <div className="product-detail-container">
        <img
          className="product-detail-img"
          src={ productDetail.thumbnail }
          alt={ productDetail.title }
        />
        <div className="product-detail-text-content-container">
          <p>{ productDetail.title }</p>
          <p>
            Preço:
            { productDetail.price }
          </p>
          <p>
            Quantidade disponível:
            { productDetail.available_quantity }
          </p>
          <div className="product-detail-seller-data">
            <p>Informações do Vendedor</p>
            <p>
              Cidade:
              { productDetail.seller_address.city.name }
            </p>
            <p>
              Estado:
              { productDetail.seller_address.search_location.state.name }
            </p>
            <p>
              País:
              { productDetail.seller_address.country.name }
            </p>
          </div>
        </div>
        <button
          type="button"
          className="product-detail-add-button"
          onClick={ () => addProduct(productDetail) }
        >
          Adiconar ao Carrinho
        </button>
      </div>
    );
  }

  return (
    <div>{ isLoading ? <p>Carregando...</p> : renderCardProductDetail() }</div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addProduct: (id) => { dispatch(cartActions.addProduct(id)); },
});

export default connect(null, mapDispatchToProps)(ProductDetail);
