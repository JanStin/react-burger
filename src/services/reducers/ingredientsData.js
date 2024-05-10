// Описываем функцию для изменения состояния.
import {
  INGREDIANTS_LOAD_SUCCESS,
  LOADING_INGREDIANTS,
  ERROR_INGREDIANTS,
  GET_POPUP_INGREDIANT,
} from "../actions/ingredientsData";

const initialState = {
  ingredients: [],
  loading: false,
  error: false,
  popupData: {},
};

export const reducerIngredients = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_INGREDIANTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ERROR_INGREDIANTS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case INGREDIANTS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: action.payload,
      };
    case GET_POPUP_INGREDIANT:
      return {
        ...state,
        popupData: [...state.ingredients].filter(
          (item) => item._id === action.id
        )[0],
      };
    default:
      return state;
  }
};
