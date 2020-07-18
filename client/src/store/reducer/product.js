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
    case "GET_PRODUCTBYID": {
      return { ...state, product: action.payload };
    }
    case "ADD_PRODUCTS": {
      return { ...state, products: [...state.products, action.payload] };
    }
    case "EDIT_PRODUCTS": {
      console.log(action.payload);
      return {
        ...state,
        products: [
          ...state.products,
          state.products.splice(
            state.products.findIndex((x) => x.id == action.payload.id),
            1,
            action.payload
          ),
        ],
      };
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
