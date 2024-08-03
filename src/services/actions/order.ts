import { postOrder as apiPostOrder } from "../../utils/ingredients";
import { TIngredient } from "../../utils/types";
import { Dispatch } from "redux";

export const name = "order";

export const ActionTypes = {
  ORDER_LOAD_SUCCESS: `${name}/ORDER_LOAD_SUCCESS`,
  ORDER_LOADING: `${name}/ORDER_LOADING`,
  ORDER_ERROR: `${name}/ORDER_ERROR`,
  CLOSE_ORDER: `${name}/CLOSE_ORDER`,
} as const;

type TOrderLoadSuccessAction = {
  readonly type: typeof ActionTypes.ORDER_LOAD_SUCCESS;
  payload: number;
};

type TOrderLoadingAction = {
  readonly type: typeof ActionTypes.ORDER_LOADING;
};

type TOrderErrorAction = {
  readonly type: typeof ActionTypes.ORDER_ERROR;
  payload: string;
};

type TCloseOrderAction = {
  readonly type: typeof ActionTypes.CLOSE_ORDER;
};

export type TOrderActions =
  | TOrderLoadSuccessAction
  | TOrderLoadingAction
  | TOrderErrorAction
  | TCloseOrderAction;

export const postOrder =
  (ingredients: TIngredient[]) => (dispatch: Dispatch<TOrderActions>) => {
    dispatch({ type: ActionTypes.ORDER_LOADING });

    return apiPostOrder(ingredients)
      .then((res) => {
        dispatch({
          type: ActionTypes.ORDER_LOAD_SUCCESS,
          payload: res.order.number,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.ORDER_ERROR,
          payload: err.message,
        });
      });
  };
