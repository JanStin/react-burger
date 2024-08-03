import { postOrder as apiPostOrder } from "../../utils/ingredients";
import { TIngredient } from "../../utils/types";
import { Dispatch } from "redux";

export const name = "order";

export const ActionOrderTypes = {
  ORDER_LOAD_SUCCESS: `${name}/ORDER_LOAD_SUCCESS`,
  ORDER_LOADING: `${name}/ORDER_LOADING`,
  ORDER_ERROR: `${name}/ORDER_ERROR`,
  CLOSE_ORDER: `${name}/CLOSE_ORDER`,
} as const;

type TOrderLoadSuccessAction = {
  readonly type: typeof ActionOrderTypes.ORDER_LOAD_SUCCESS;
  payload: number;
};

type TOrderLoadingAction = {
  readonly type: typeof ActionOrderTypes.ORDER_LOADING;
};

type TOrderErrorAction = {
  readonly type: typeof ActionOrderTypes.ORDER_ERROR;
  payload: string;
};

type TCloseOrderAction = {
  readonly type: typeof ActionOrderTypes.CLOSE_ORDER;
};

export type TOrderActions =
  | TOrderLoadSuccessAction
  | TOrderLoadingAction
  | TOrderErrorAction
  | TCloseOrderAction;

export const postOrder =
  (ingredients: TIngredient[]) => (dispatch: Dispatch<TOrderActions>) => {
    dispatch({ type: ActionOrderTypes.ORDER_LOADING });

    return apiPostOrder(ingredients)
      .then((res) => {
        dispatch({
          type: ActionOrderTypes.ORDER_LOAD_SUCCESS,
          payload: res.order.number,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionOrderTypes.ORDER_ERROR,
          payload: err.message,
        });
      });
  };
