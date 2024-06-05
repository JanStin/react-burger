import { getCookie } from "./utils";

const URL_FORGOT_PASSWORD =
  "https://norma.nomoreparties.space/api/password-reset";
const URL_RESET_PASSWORD =
  "https://norma.nomoreparties.space/api/password-reset/reset";
const URL_REGISTER = "https://norma.nomoreparties.space/api/auth/register";
const URL_LOGIN = "POST https://norma.nomoreparties.space/api/auth/login";
const URL_LOGOUT = "POST https://norma.nomoreparties.space/api/auth/logout";
const URL_TOKEN = "POST https://norma.nomoreparties.space/api/auth/token";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

/**
 * Тело
 * "email": ""
 * Ответ:
 * "success": true,
 * "message": "Reset email sent"
 */
const forgotPasswordRequest = (form) => {
  return fetch(URL_FORGOT_PASSWORD, {
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
const resetPasswordRequest = (form) => {
  return fetch(URL_RESET_PASSWORD, {
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
  return fetch(URL_REGISTER, {
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
  return fetch(URL_LOGIN, {
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
  return fetch(URL_TOKEN, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
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
  return fetch(URL_LOGOUT, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(getResponse);
};

export const api = {
  forgotPasswordRequest,
  resetPasswordRequest,
  registerationRequest,
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
};
