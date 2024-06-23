const BASE_URL = "https://norma.nomoreparties.space/api/";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

/**
 * Тело
 * "refreshToken"
 * Ответ:
 * "success": true,
 * "user": {
 *   "email": "",
 *   "name": ""
 * }
 */
const getUser = () => {
  return fetch(BASE_URL + "auth/user", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(getResponse);
};

/**
 * Тело
 * "refreshToken"
 * Ответ:
 * "success": true,
 * "user": {
 *   "email": "",
 *   "name": ""
 * }
 */
const updateUser = (form) => {
  return fetch(BASE_URL + "auth/user", {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(getResponse);
};

/**
 * Тело
 * "email": ""
 * Ответ:
 * "success": true,
 * "message": "Reset email sent"
 */
export const forgotPasswordRequest = (form) => {
  return fetch(BASE_URL + "password-reset", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(getResponse);
};

/**
 * Тело
 * "password": "",
 * "token": ""
 * Ответ:
 * "success": true,
 * "message": "Password successfully reset"
 */
export const resetPasswordRequest = (form) => {
  return fetch(BASE_URL + "password-reset/reset", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(getResponse);
};

/**
 * Тело
 * "email": "test-data@yandex.ru",
 * "password": "password",
 * "name": "Username"
 * Ответ:
 * {
    "success": true,
    "user": {
        "email": "",
        "name": ""
    },
    "accessToken": "Bearer ...",
    "refreshToken": ""
   }
 */
const registerationRequest = (form) => {
  return fetch(BASE_URL + "auth/register", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(getResponse);
};

/**
 * Тело
 * "email": "test-data@yandex.ru",
 * "password": "password",
 * Ответ:
 * {
    "success": true,
    "user": {
        "email": "",
        "name": ""
    },
    "accessToken": "Bearer ...",
    "refreshToken": ""
   }
 */
const loginRequest = (form) => {
  return fetch(BASE_URL + "auth/login", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(getResponse);
};

/**
 * Тело
 * "token": "значение refreshToken"
 * Ответ:
 * {
    "success": true,
    "accessToken": "Bearer ...",
    "refreshToken": ""
   }
 */
const refreshTokenRequest = () => {
  return fetch(BASE_URL + "auth/token", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(getResponse);
};

/**
 * Тело
 * "token": "значение refreshToken"
 * Ответ:
 * {
    "success": true,
    "message": "Successful logout
   }
 */
const logoutRequest = () => {
  return fetch(BASE_URL + "auth/logout", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(getResponse);
};

export const api = {
  registerationRequest,
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
  getUser,
  updateUser,
};
