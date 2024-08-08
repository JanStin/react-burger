import { TOrdersResponse } from "../../utils/types";

export const name = "feed";

export const ActionFeedTypes = {
  WS_CONNECTION_START: `${name}/WS_CONNECTION_START`,
  WS_CONNECTION_SUCCESS: `${name}/WS_CONNECTION_SUCCESS`,
  WS_CONNECTION_ERROR: `${name}/WS_CONNECTION_ERROR`,
  WS_CONNECTION_CLOSED: `${name}/WS_CONNECTION_CLOSED`,
  WS_GET_ORDERS: `${name}/WS_GET_ORDERS`,
} as const;

type TWSConnectionStartAction = {
  readonly type: typeof ActionFeedTypes.WS_CONNECTION_START;
};

type TWSConnectionSuccessAction = {
  readonly type: typeof ActionFeedTypes.WS_CONNECTION_SUCCESS;
};

type TWSConnectionErrorAction = {
  readonly type: typeof ActionFeedTypes.WS_CONNECTION_ERROR;
  payload: string;
};

type TWSConnectionClosedAction = {
  readonly type: typeof ActionFeedTypes.WS_CONNECTION_CLOSED;
};

type TWSGetOrdersAction = {
  readonly type: typeof ActionFeedTypes.WS_GET_ORDERS;
  payload: TOrdersResponse;
};

export type TFeedActions =
  | TWSConnectionStartAction
  | TWSConnectionSuccessAction
  | TWSConnectionErrorAction
  | TWSConnectionClosedAction
  | TWSGetOrdersAction;

export type TWSFeedActions = {
  wsInit: typeof ActionFeedTypes.WS_CONNECTION_START;
  onOpen: typeof ActionFeedTypes.WS_CONNECTION_SUCCESS;
  onClose: typeof ActionFeedTypes.WS_CONNECTION_CLOSED;
  onError: typeof ActionFeedTypes.WS_CONNECTION_ERROR;
  onMessage: typeof ActionFeedTypes.WS_GET_ORDERS;
};

export const wsConnectionStart = (): TWSConnectionStartAction => ({
  type: ActionFeedTypes.WS_CONNECTION_START,
});

export const wsConnectionSuccess = (): TWSConnectionSuccessAction => ({
  type: ActionFeedTypes.WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (error: string): TWSConnectionErrorAction => ({
  type: ActionFeedTypes.WS_CONNECTION_ERROR,
  payload: error,
});

export const wsConnectionClosed = (): TWSConnectionClosedAction => ({
  type: ActionFeedTypes.WS_CONNECTION_CLOSED,
});

export const wsGetOrders = (orders: TOrdersResponse): TWSGetOrdersAction => ({
  type: ActionFeedTypes.WS_GET_ORDERS,
  payload: orders,
});
