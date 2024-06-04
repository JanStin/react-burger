import { getIngredients } from "../../utils/ingredients";

export const INGREDIENTS_LOAD_SUCCESS = "INGREDIENTS_LOAD_SUCCESS";
export const LOADING_INGREDIENTS = "LOADING_INGREDIENTS";
export const ERROR_INGREDIENTS = "ERROR_INGREDIENTS";
export const INCREASE_INGREDIENT = "INCREASE_INGREDIENT";
export const DECREASE_INGREDIENT = "DECREASE_INGREDIENT";
export const OPEN_POPUP = "OPEN_POPUP";
export const CLOSE_POPUP = "CLOSE_POPUP";
export const GET_INGREDIENT = "GET_INGREDIENT";

export const loadIngredients = () => (dispatch) => {
  dispatch({ type: LOADING_INGREDIENTS });

  return getIngredients()
    .then((res) => {
      dispatch({
        type: INGREDIENTS_LOAD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_INGREDIENTS,
        payload: err.message,
      });
    });
};
