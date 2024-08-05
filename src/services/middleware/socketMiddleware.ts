import { Middleware, MiddlewareAPI } from "redux";
import {
  ActioFeedTypes,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetOrders,
} from "../actions/feed";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
      const { dispatch } = store;
      switch (action.type) {
        case ActioFeedTypes.WS_CONNECTION_START:
          socket = new WebSocket(wsUrl);
          socket.onopen = () => {
            dispatch(wsConnectionSuccess());
          };
          socket.onerror = (error) => {
            dispatch(wsConnectionError(`WebSocket error: ${error}`));
          };
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(wsGetOrders(parsedData));
          };
          socket.onclose = () => {
            dispatch(wsConnectionClosed());
          };
          break;
        case ActioFeedTypes.WS_CONNECTION_CLOSED:
          if (socket) {
            socket.close();
          }
          break;
        default:
          break;
      }

      next(action);
    };
  };
};
