import { ActionIngredientsTypes, TIngredientsActions } from "../actions/ingredientsData";
import { TIngredient } from "../../utils/types";

type TIngredientsDataInitialState = {
  ingredients: Array<TIngredient> | null;
  loading: boolean;
  error: string;
  popupData: TIngredient | null;
  popupIsOpen: boolean;
};

export const initialState: TIngredientsDataInitialState = {
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
    case ActionIngredientsTypes.LOADING_INGREDIENTS:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ActionIngredientsTypes.ERROR_INGREDIENTS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionIngredientsTypes.INGREDIENTS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        ingredients: action.payload,
      };
    case ActionIngredientsTypes.GET_INGREDIENT:
      return {
        ...state,
        popupData:
          state.ingredients?.find((item) => item._id === action.id) || null,
      };
    case ActionIngredientsTypes.OPEN_POPUP:
      return {
        ...state,
        popupIsOpen: true,
      };
    case ActionIngredientsTypes.CLOSE_POPUP:
      return {
        ...state,
        popupData: null,
        popupIsOpen: false,
      };
    case ActionIngredientsTypes.INCREASE_INGREDIENT:
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
    case ActionIngredientsTypes.DECREASE_INGREDIENT:
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
