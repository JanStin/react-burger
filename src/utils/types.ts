import { reducer } from "../services/reduces";
// export type TIngredients = {
//   ingredients: Array<TIngredient>;
// };
export type TRootState = ReturnType<typeof reducer>;

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number;
};

export type TIngredientType = "bun" | "main" | "sauce";

export type TIngredientsReducer = {
  ingredients: Array<TIngredient>;
  loading?: boolean;
  error?: boolean;
  popupData?: boolean | TIngredient;
  popupIsOpen?: boolean;
};

export type TOrderResponse = {
  success: boolean;
  name: string;
  order: TOrder;
};

type TOrder = {
  number: number;
};
