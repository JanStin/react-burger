import { getIngredients } from "../../utils/ingredients";

// Тут пишем константы.
export const INGREDIANTS_LOAD_SUCCESS = "INGREDIANTS_LOAD_SUCCESS";
export const LOADING_INGREDIANTS = "LOADING_INGREDIANTS";
export const ERROR_INGREDIANTS = "ERROR_INGREDIANTS";

// Так же тут пишем функцию, которая берет в качестве type константу, а в качестве payload формат данных.

export const loadIngredients  = () => (dispatch) => {
  dispatch({ type: LOADING_INGREDIANTS });

  return getIngredients()
    .then((res) => {
      dispatch({
        type: INGREDIANTS_LOAD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_INGREDIANTS,
        payload: err.message,
      });
    });
};
