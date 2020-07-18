const initialState = {
  products: [],
  newProduct: {},
  product: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return { ...state, products: action.payload };
    }
    case "ADD_PRODUCTS": {
      return { ...state, products: [...state.products, action.payload] };
    }
    case "ADD_CATEGORY": {
      return { ...state, products: [...state.products, action.payload] };
    }
    case "DELETE_PRODUCTS": {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
