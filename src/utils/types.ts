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

export type TOrderDetails = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  owner?: string;
  __v?: number;
};

export type TOrdersResponse = {
  success: boolean;
  orders: TOrderDetails[];
  total: number;
  totalToday: number;
};
