import { BASE_URL } from "./utils";
import { TUser } from "./types";

const getResponse = <T,>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const request = <T,>(url: string, options: RequestInit): Promise<T> => {
  return fetch(url, options).then((res) => getResponse<T>(res));
};

type TUserResponse = {
  success: boolean;
  user: TUser;
};

type TAuthResponse = {
  user: TUser;
} & TTokenResponse;

type TTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

type TMessageResponse = {
  success: boolean;
  message: string;
};

type TForm = {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
  code?: string;
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
const getUser = (): Promise<TUserResponse> => {
  return request(BASE_URL + "auth/user", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") || "",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
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
const updateUser = (form: TForm): Promise<TUserResponse> => {
  return request(BASE_URL + "auth/user", {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") || "",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

/**
 * Тело
 * "email": ""
 * Ответ:
 * "success": true,
 * "message": "Reset email sent"
 */
export const forgotPasswordRequest = (
  form: TForm
): Promise<TMessageResponse> => {
  return request(BASE_URL + "password-reset", {
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
  });
};

/**
 * Тело
 * "password": "",
 * "token": ""
 * Ответ:
 * "success": true,
 * "message": "Password successfully reset"
 */
export const resetPasswordRequest = (
  form: TForm
): Promise<TMessageResponse> => {
  return request(BASE_URL + "password-reset/reset", {
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
  });
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
const registerationRequest = (form: TForm): Promise<TAuthResponse> => {
  return request(BASE_URL + "auth/register", {
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
  });
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
const loginRequest = (form: TForm): Promise<TAuthResponse> => {
  return request(BASE_URL + "auth/login", {
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
  });
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
const refreshTokenRequest = (): Promise<TTokenResponse> => {
  return request(BASE_URL + "auth/token", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
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
const logoutRequest = (): Promise<TMessageResponse> => {
  return request(BASE_URL + "auth/logout", {
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
  });
};

export const api = {
  registerationRequest,
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
  getUser,
  updateUser,
};
