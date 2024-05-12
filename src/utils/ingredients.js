const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";
const orderURL = "https://norma.nomoreparties.space/api/orders";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
  return fetch(ingredientsURL).then(getResponse);
};

export const postOrder = (ingredients) => {
  return fetch(orderURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "ingredients": ingredients,
    }),
  }).then(getResponse);
};
