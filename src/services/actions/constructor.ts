import { TIngredient } from "../../utils/types";

export const name = "constructor";

export const ActionConstructorTypes = {
  ADD_BUN: `${name}/ADD_BUN`,
  REMOVE_BUN: `${name}/REMOVE_BUN`,
  ADD_INGREDIENT: `${name}/ADD_INGREDIENT`,
  REMOVE_INGREDIENT: `${name}/REMOVE_INGREDIENT`,
  CHANGE_ORDER_INGREDIENTS: `${name}/CHANGE_ORDER_INGREDIENTS`,
} as const;

type TAddBun = {
  readonly type: typeof ActionConstructorTypes.ADD_BUN;
  bun: TIngredient;
};

type TRemoveBun = {
  readonly type: typeof ActionConstructorTypes.REMOVE_BUN;
};

type TAddIngredient = {
  readonly type: typeof ActionConstructorTypes.ADD_INGREDIENT;
  item: TIngredient;
};

type TRemoveIngredient = {
  readonly type: typeof ActionConstructorTypes.REMOVE_INGREDIENT;
  key: string;
};

type TChangeOrderIngredients = {
  readonly type: typeof ActionConstructorTypes.CHANGE_ORDER_INGREDIENTS;
  toIndex: number;
  fromIndex: number;
};

export type TConstructurActions =
  | TAddBun
  | TRemoveBun
  | TAddIngredient
  | TRemoveIngredient
  | TChangeOrderIngredients;
