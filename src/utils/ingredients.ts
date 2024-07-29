import { getResponse, BASE_URL } from "./utils";
import { TIngredient } from "./types";

// TODO: Проверить необходимость импортировать типы.
type TGetIngredients = {
  data: Array<TIngredient>;
  success: boolean;
};

type TOrder = {
  number: number;
};

type TOrderInfo = {
  name: string;
  order: TOrder;
  success: boolean;
};

export const getIngredients = (): Promise<TGetIngredients> => {
  return fetch(BASE_URL + "ingredients").then((res) =>
    getResponse<TGetIngredients>(res)
  );
};

export const postOrder = (ingredients: Array<TIngredient>) => {
  return fetch(BASE_URL + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then((res) => getResponse<TOrderInfo>(res));
};
