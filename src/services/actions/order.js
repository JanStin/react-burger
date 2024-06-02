import { postOrder as apiPostOrder } from "../../utils/ingredients";

export const ORDER_LOAD_SUCCESS = "ORDER_LOAD_SUCCESS";
export const ORDER_LOADING = "ORDER_LOADING";
export const ORDER_ERROR = "ORDER_ERROR";
export const CLOSE_ORDER = "CLOSE_ORDER";

export const postOrder = (ingredients) => (dispatch) => {
  return apiPostOrder(ingredients).then((res) => {
    dispatch({
      type: ORDER_LOAD_SUCCESS,
      payload: res,
    });
  });
};
