import { getResponse, BASE_URL } from "./utils";
import { TIngredientsArray } from "./types";

export const getIngredients = () => {
  return fetch(BASE_URL + "ingredients").then(getResponse);
};

export const postOrder = (ingredients: TIngredientsArray) => {
  return fetch(BASE_URL + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then(getResponse);
};
