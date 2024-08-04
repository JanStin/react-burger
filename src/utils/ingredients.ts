import { getResponse, BASE_URL } from "./utils";
import { TIngredient } from "./types";
import { TOrderResponse } from "./types";

// TODO: Проверить необходимость импортировать типы.
type TGetIngredients = {
  data: Array<TIngredient>;
  success: boolean;
};

export const getIngredients = (): Promise<TGetIngredients> => {
  return fetch(BASE_URL + "ingredients").then((res) =>
    getResponse<TGetIngredients>(res)
  );
};

export const postOrder = (ingredients: Array<string>) => {
  return fetch(BASE_URL + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then((res) => getResponse<TOrderResponse>(res));
};
