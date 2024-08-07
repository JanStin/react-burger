import { TOrdersResponse } from "../../utils/types";

export const name = "userFeed";

export const ActionUserFeedTypes = {
  WS_CONNECTION_START: `${name}/WS_CONNECTION_START`,
  WS_CONNECTION_SUCCESS: `${name}/WS_CONNECTION_SUCCESS`,
  WS_CONNECTION_ERROR: `${name}/WS_CONNECTION_ERROR`,
  WS_CONNECTION_CLOSED: `${name}/WS_CONNECTION_CLOSED`,
  WS_GET_ORDERS: `${name}/WS_GET_ORDERS`,
} as const;

type TWSConnectionStartAction = {
  readonly type: typeof ActionUserFeedTypes.WS_CONNECTION_START;
};

type TWSConnectionSuccessAction = {
  readonly type: typeof ActionUserFeedTypes.WS_CONNECTION_SUCCESS;
};

type TWSConnectionErrorAction = {
  readonly type: typeof ActionUserFeedTypes.WS_CONNECTION_ERROR;
  payload: string;
};

type TWSConnectionClosedAction = {
  readonly type: typeof ActionUserFeedTypes.WS_CONNECTION_CLOSED;
};

type TWSGetOrdersAction = {
  readonly type: typeof ActionUserFeedTypes.WS_GET_ORDERS;
  payload: TOrdersResponse;
};

export type TUserFeedActions =
  | TWSConnectionStartAction
  | TWSConnectionSuccessAction
  | TWSConnectionErrorAction
  | TWSConnectionClosedAction
  | TWSGetOrdersAction;

export type TWSUserFeedActions = {
  wsInit: typeof ActionUserFeedTypes.WS_CONNECTION_START;
  onOpen: typeof ActionUserFeedTypes.WS_CONNECTION_SUCCESS;
  onClose: typeof ActionUserFeedTypes.WS_CONNECTION_CLOSED;
  onError: typeof ActionUserFeedTypes.WS_CONNECTION_ERROR;
  onMessage: typeof ActionUserFeedTypes.WS_GET_ORDERS;
};

export const wsUserConnectionStart = (): TWSConnectionStartAction => ({
  type: ActionUserFeedTypes.WS_CONNECTION_START,
});

export const wsUserConnectionSuccess = (): TWSConnectionSuccessAction => ({
  type: ActionUserFeedTypes.WS_CONNECTION_SUCCESS,
});

export const wsUserConnectionError = (error: string): TWSConnectionErrorAction => ({
  type: ActionUserFeedTypes.WS_CONNECTION_ERROR,
  payload: error,
});

export const wsUserConnectionClosed = (): TWSConnectionClosedAction => ({
  type: ActionUserFeedTypes.WS_CONNECTION_CLOSED,
});

export const wsUserGetOrders = (orders: TOrdersResponse): TWSGetOrdersAction => ({
  type: ActionUserFeedTypes.WS_GET_ORDERS,
  payload: orders,
});
