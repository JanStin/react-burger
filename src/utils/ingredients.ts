import { getResponse, BASE_URL } from "./utils";
import { TIngredient } from "./types";
import { TOrderResponse } from "./types";

type TGetIngredients = {
  data: Array<TIngredient>;
  success: boolean;
};

export const getIngredients = (): Promise<TGetIngredients> => {
  return fetch(BASE_URL + "ingredients").then((res) =>
    getResponse<TGetIngredients>(res)
  ).catch((error) => error);
};

export const postOrder = (ingredients: Array<string>) => {
  return fetch(BASE_URL + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") || "",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
    .then((res) => getResponse<TOrderResponse>(res))
    .catch((error) => error);
};
