import { TIngredient } from "../../utils/types";

export const name = "constructor";

export const ActionTypes = {
  ADD_BUN: `${name}/ADD_BUN`,
  REMOVE_BUN: `${name}/REMOVE_BUN`,
  ADD_INGREDIENT: `${name}/ADD_INGREDIENT`,
  REMOVE_INGREDIENT: `${name}/REMOVE_INGREDIENT`,
  CHANGE_ORDER_INGREDIENTS: `${name}/CHANGE_ORDER_INGREDIENTS`,
} as const;

type TAddBun = {
  readonly type: typeof ActionTypes.ADD_BUN;
  payload: TIngredient;
};

type TRemoveBun = {
  readonly type: typeof ActionTypes.REMOVE_BUN;
};

type TAddIngredient = {
  readonly type: typeof ActionTypes.ADD_INGREDIENT;
  payload: TIngredient;
};

type TRemoveIngredient = {
  readonly type: typeof ActionTypes.REMOVE_INGREDIENT;
  payload: string;
};

type TChangeOrderIngredients = {
  readonly type: typeof ActionTypes.CHANGE_ORDER_INGREDIENTS;
  toIndex: number;
  fromIndex: number;
};

export type TConstructurActions =
  | TAddBun
  | TRemoveBun
  | TAddIngredient
  | TRemoveIngredient
  | TChangeOrderIngredients;
