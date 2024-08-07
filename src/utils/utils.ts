export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const getResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

type CookieProps = {
  expires?: number | Date | string;
  [propName: string]: any;
};

export function setCookie(
  name: string,
  value: string | null | boolean,
  props: CookieProps = {}
): void {
  let exp = props.expires;
  if (typeof exp === "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value || "");
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, null, { expires: -1 });
}

export const getDate = (date: string) => {
  const today = new Date();
  const orderDate = new Date(date);

  return new Date(
    today.getFullYear() === orderDate.getFullYear()
      ? orderDate.getFullYear()
      : orderDate.getFullYear() -
        (today.getFullYear() - orderDate.getFullYear()),
    today.getMonth() === orderDate.getMonth()
      ? orderDate.getMonth()
      : orderDate.getMonth() - (today.getMonth() - orderDate.getMonth()),
    today.getDate() === orderDate.getDate()
      ? today.getDate()
      : orderDate.getDate() - (today.getDate() - orderDate.getDate()),
    orderDate.getHours(),
    orderDate.getMinutes()
  );
};
