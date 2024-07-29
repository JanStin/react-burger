import { getIngredients } from "../../utils/ingredients";
import { TIngredient } from "../../utils/types";
import { Dispatch } from "redux";

export const name = "ingredientsData";

export const ActionTypes = {
  INGREDIENTS_LOAD_SUCCESS: `${name}/INGREDIENTS_LOAD_SUCCESS`,
  LOADING_INGREDIENTS: `${name}/LOADING_INGREDIENTS`,
  ERROR_INGREDIENTS: `${name}/ERROR_INGREDIENTS`,
  INCREASE_INGREDIENT: `${name}/INCREASE_INGREDIENT`,
  DECREASE_INGREDIENT: `${name}/DECREASE_INGREDIENT`,
  OPEN_POPUP: `${name}/OPEN_POPUP`,
  CLOSE_POPUP: `${name}/CLOSE_POPUP`,
  GET_INGREDIENT: `${name}/GET_INGREDIENT`,
} as const;

type TIngredientsLoadSuccessAction = {
  type: typeof ActionTypes.INGREDIENTS_LOAD_SUCCESS;
  payload: TIngredient[];
};

type TLoadingIngredientsAction = {
  type: typeof ActionTypes.LOADING_INGREDIENTS;
};

type TErrorIngredientsAction = {
  type: typeof ActionTypes.ERROR_INGREDIENTS;
  payload: string;
};

type TGetIngredientsAction = {
  type: typeof ActionTypes.GET_INGREDIENT;
  id: string;
};

type TOpenPopupAction = {
  type: typeof ActionTypes.OPEN_POPUP;
};

type TClosePopupAction = {
  type: typeof ActionTypes.CLOSE_POPUP;
};

type TIncreaseIngredientAction = {
  type: typeof ActionTypes.INCREASE_INGREDIENT;
  id: string;
};

type TDecreaseIngredientAction = {
  type: typeof ActionTypes.DECREASE_INGREDIENT;
  id: string;
};

export type TIngredientsActions =
  | TIngredientsLoadSuccessAction
  | TLoadingIngredientsAction
  | TErrorIngredientsAction
  | TGetIngredientsAction
  | TOpenPopupAction
  | TClosePopupAction
  | TIncreaseIngredientAction
  | TDecreaseIngredientAction;

// Типизация функции loadIngredients
export const loadIngredients =
  () => (dispatch: Dispatch<TIngredientsActions>) => {
    dispatch({ type: ActionTypes.LOADING_INGREDIENTS });

    return getIngredients()
      .then((res) => {
        dispatch({
          type: ActionTypes.INGREDIENTS_LOAD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.ERROR_INGREDIENTS,
          payload: err.message,
        });
      });
  };
