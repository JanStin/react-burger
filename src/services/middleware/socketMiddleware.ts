import { Middleware, MiddlewareAPI } from "redux";
import {
  TWssAction,
  TAppDispatch,
  TRootState,
  TWssStoreActions,
} from "../store";
import { api } from "../../utils/api";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWssStoreActions,
  isNeedUser: boolean
): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    let reconnectTimer: number | null = null;
    const reconnectInterval = 5000;

    return (next) => (action: TWssAction) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const { user } = getState().user;
      if (type === wsInit && !isNeedUser) {
        socket = new WebSocket(`${wsUrl}`);
      } else if (type === wsInit && isNeedUser && user) {
        const token = localStorage.getItem("accessToken")?.split(" ")[1];
        if (token) {
          socket = new WebSocket(`${wsUrl}${token}`);
        } else {
          api
            .refreshTokenRequest()
            .then((data) => {
              if (data.success) {
                localStorage.setItem("accessToken", data.accessToken);
                socket = new WebSocket(
                  `${wsUrl}${data.accessToken.split(" ")[1]}`
                );
              }
            })
            .catch((error) => {
              console.error("Ошибка обновления токена:", error);
            });
        }
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });

          if (reconnectTimer) {
            clearTimeout(reconnectTimer);
          }
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event.toString() });

          if (reconnectTimer === null) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: onOpen });
            }, reconnectInterval);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
};
