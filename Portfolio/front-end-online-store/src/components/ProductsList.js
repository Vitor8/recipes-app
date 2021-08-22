import React from 'react';
import '../css/ProductsList.css';
import ProductCard from './ProductCard';

function ProductsList({ products, setProductDetailId, setProducts, setCategoryId }) {
  return (
    <div className="product-list-container">
      { products.map((product) => (
        <ProductCard
          key={ product.id }
          product={ product }
          setProductDetailId={ setProductDetailId }
          setProducts={ setProducts }
          setCategoryId={ setCategoryId }
        />
      )) }
    </div>
  );
}

export default ProductsList;
