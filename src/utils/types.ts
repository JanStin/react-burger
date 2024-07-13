export type TIngredients = {
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
};

export type TIngredientType = "bun" | "main" | "sauce";

export type TIngredientsReducer = {
  ingredients: TIngredients;
  loading?: boolean;
  error?: boolean;
  popupData?: boolean | TIngredient;
  popupIsOpen?: boolean;
};
