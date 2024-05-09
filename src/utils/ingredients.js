const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";

// export const get
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
  return fetch(ingredientsURL).then(getResponse);
};
