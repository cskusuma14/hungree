const initialState = {
  categories: [],
  category: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES": {
      return { ...state, categories: action.payload };
    }

    case "ADD_CATEGORIES": {
      return { ...state, categories: [...state.categories, action.payload] };
    }
    case "DELETE_CATEGORIES": {
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
