import { ActionTypes, TIngredientsActions } from "../actions/ingredientsData";
import { TIngredient } from "../../utils/types";

type TIngredientsDataInitialState = {
  ingredients: Array<TIngredient> | null;
  loading: boolean;
  error: string;
  popupData: TIngredient | null;
  popupIsOpen: boolean;
};

const initialState: TIngredientsDataInitialState = {
  ingredients: null,
  loading: false,
  error: "",
  popupData: null,
  popupIsOpen: false,
};

export const reducerIngredients = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsDataInitialState => {
  switch (action.type) {
    case ActionTypes.LOADING_INGREDIENTS:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ActionTypes.ERROR_INGREDIENTS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.INGREDIENTS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: action.payload,
      };
    case ActionTypes.GET_INGREDIENT:
      return {
        ...state,
        popupData:
          state.ingredients?.find((item) => item._id === action.id) || null,
      };
    case ActionTypes.OPEN_POPUP:
      return {
        ...state,
        popupIsOpen: true,
      };
    case ActionTypes.CLOSE_POPUP:
      return {
        ...state,
        popupData: null,
        popupIsOpen: false,
      };
    case ActionTypes.INCREASE_INGREDIENT:
      return {
        ...state,
        ingredients:
          state.ingredients?.map((ingredient) => {
            if (ingredient._id === action.id) {
              return { ...ingredient, count: (ingredient.count || 0) + 1 };
            } else {
              return ingredient;
            }
          }) || null,
      };
    case ActionTypes.DECREASE_INGREDIENT:
      return {
        ...state,
        ingredients:
          state.ingredients?.map((ingredient) =>
            ingredient._id === action.id
              ? {
                  ...ingredient,
                  count: Math.max((ingredient.count || 0) - 1, 0),
                }
              : ingredient
          ) || null,
      };
    default:
      return state;
  }
};
