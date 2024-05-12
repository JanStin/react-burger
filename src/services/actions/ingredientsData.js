import { getIngredients } from "../../utils/ingredients";

export const INGREDIANTS_LOAD_SUCCESS = "INGREDIANTS_LOAD_SUCCESS";
export const LOADING_INGREDIANTS = "LOADING_INGREDIANTS";
export const ERROR_INGREDIANTS = "ERROR_INGREDIANTS";
export const OPEN_POPUP = "OPEN_POPUP";
export const CLOSE_POPUP = "CLOSE_POPUP";
export const INCREASE_INGREDIANT = "INCREASE_INGREDIANT";
export const DECREASE_INGREDIANT = "DECREASE_INGREDIANT";

export const loadIngredients = () => (dispatch) => {
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
