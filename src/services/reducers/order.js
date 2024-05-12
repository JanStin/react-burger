import {
  ORDER_LOAD_SUCCESS,
  ORDER_LOADING,
  ORDER_ERROR,
} from "../actions/order";

const initialState = {
  order: null,
  loading: false,
  error: false,
};

export const orderIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    default:
      return state;
  }
};
