import {
  INGREDIENTS_LOAD_SUCCESS,
  LOADING_INGREDIENTS,
  ERROR_INGREDIENTS,
  GET_POPUP_INGREDIENT,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
} from "../actions/ingredientsData";

const initialState = {
  ingredients: [],
  loading: false,
  error: false,
  popupData: {},
};

export const reducerIngredients = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_INGREDIENTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ERROR_INGREDIENTS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case INGREDIENTS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: action.payload,
      };
    case GET_POPUP_INGREDIENT:
      return {
        ...state,
        popupData: [...state.ingredients].filter(
          (item) => item._id === action.id
        )[0],
      };
    case INCREASE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
          if (ingredient._id === action.id) {
            let count;
            if (!ingredient.hasOwnProperty("count")) {
              count = 1;
            } else {
              count = ++ingredient.count;
            }
            return { ...ingredient, count: count };
          } else {
            return ingredient;
          }
        }),
      };
    case DECREASE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) =>
          ingredient._id === action.id
            ? { ...ingredient, count: --ingredient.count }
            : ingredient
        ),
      };
    default:
      return state;
  }
};
