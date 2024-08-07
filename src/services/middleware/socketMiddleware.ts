import { Middleware, MiddlewareAPI } from "redux";
import { TWssAction, TAppDispatch, TRootState, TWssStoreActions } from "../store";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWssStoreActions
): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    let reconnectTimer: number | null = null;
    const reconnectInterval = 5000;

    return (next) => (action: TWssAction) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });

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

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
