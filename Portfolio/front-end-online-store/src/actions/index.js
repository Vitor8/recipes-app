const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const DECREASE_QUANT_PRODUCT = 'DECREASE_QUANT_PRODUCT';
const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
const RESTART_STATE = 'RESTART_SESSION';

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
  },
});

export const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

export const decreaseQuantProduct = (product) => ({
  type: DECREASE_QUANT_PRODUCT,
  payload: {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
  },
});

export const restartState = () => ({
  type: RESTART_STATE,
});

const saveCategories = (categories) => ({
  type: SAVE_CATEGORIES,
  payload: categories,
});

export const getCategories = () => async (dispatch) => {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const json = await response.json();
  dispatch(saveCategories(json));
};
