// Estrutura chave cartProducts
// Será um array de objetos
// Cada objeto com a seguinte estrutura
/*
  {
    id: action.payload.id,
    title: action.payload.title,
    price: action.payload.price,
    thumbnail: action.payload.thumbnail,
    quant_product: X,
  }
*/

const INITIAL_STATE = {
  categories: [],
  cartProducts: [],
};

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_PRODUCT':
    let productObject = {};
    let positionAtCart = null;
    let isAlreadyAtCart = false;
    state.cartProducts.forEach((product, index) => {
      if (product.id === action.payload.id) {
        isAlreadyAtCart = true;
        positionAtCart = index;
      }
    });
    if (!isAlreadyAtCart) { // não existe no cart, estou add um novo produto
      productObject = {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        thumbnail: action.payload.thumbnail,
        quant_product: 1,
      };
      return {
        ...state,
        cartProducts: [...state.cartProducts, productObject],
      };
    }
    productObject = {
      ...state.cartProducts[positionAtCart],
      quant_product: state.cartProducts[positionAtCart].quant_product + 1,
    };
    const newCartProducts = [...state.cartProducts];
    newCartProducts[positionAtCart] = productObject;
    return {
      ...state,
      cartProducts: newCartProducts,
    };

  case 'DECREASE_QUANT_PRODUCT':
    let productPosition = null;
    state.cartProducts.forEach((product, index) => {
      if (product.id === action.payload.id) productPosition = index;
    });
    let newObjectProduct = {};
    const currentQuant = state.cartProducts[productPosition].quant_product;
    if (currentQuant > 0) {
      newObjectProduct = {
        ...state.cartProducts[productPosition],
        quant_product: state.cartProducts[productPosition].quant_product - 1,
      };
    } else {
      newObjectProduct = {
        ...state.cartProducts[productPosition],
        quant_product: 0,
      };
    }
    const cartProductsUpdated = [...state.cartProducts];
    cartProductsUpdated[productPosition] = newObjectProduct;
    return {
      ...state,
      cartProducts: cartProductsUpdated,
    };

  case 'REMOVE_PRODUCT':
    const productDeleted = state.cartProducts.filter((product) => product.id != action.payload);
    return {
      ...state,
      cartProducts: productDeleted,
    };
  case 'SAVE_CATEGORIES':
    return {
      ...state,
      categories: action.payload,
    };
  case 'RESTART_SESSION':
    return {
      ...state,
      cartProducts: [],
    };
  default:
    return state;
  }
};

export default cart;
