import { reducer } from "../services/reduces";

export type TRootState = ReturnType<typeof reducer>;

export type TIngredientsArray = {
  ingredients: Array<TIngredient>;
};

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
  key?: string;
};

export type TIngredientType = "bun" | "main" | "sauce";

export type TIngredientsReducer = {
  loading?: boolean;
  error?: boolean;
  popupData?: boolean | TIngredient;
  popupIsOpen?: boolean;
} & TIngredientsArray;

export type TOrderResponse = {
  success: boolean;
  name: string;
  order: TOrder;
};

type TOrder = {
  number: number;
};

export type TUserInfo = {
  user: TUser;
  isAuthChecked: boolean;
};

export type TUser = {
  email: string;
  name: string;
  password?: string;
};
