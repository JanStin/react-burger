import {
  INGREDIENTS_LOAD_SUCCESS,
  LOADING_INGREDIENTS,
  ERROR_INGREDIENTS,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  OPEN_POPUP,
  CLOSE_POPUP,
} from "../actions/ingredientsData";

const initialState = {
  ingredients: [],
  loading: false,
  error: false,
  popupData: {},
  popupIsOpen: false,
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
    case OPEN_POPUP:
      return {
        ...state,
        popupData: [...state.ingredients].filter(
          (item) => item._id === action.id
        )[0],
        popupIsOpen: true,
      };
    case CLOSE_POPUP:
      return {
        ...state,
        popupData: {},
        popupIsOpen: false,
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
