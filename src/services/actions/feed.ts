export const name = "feed";

export const ActioFeedTypes = {
  WS_CONNECTION_START: `${name}/WS_CONNECTION_START`,
  WS_CONNECTION_SUCCESS: `${name}/WS_CONNECTION_SUCCESS`,
  WS_CONNECTION_ERROR: `${name}/WS_CONNECTION_ERROR`,
  WS_CONNECTION_CLOSED: `${name}/WS_CONNECTION_CLOSED`,
  WS_GET_ORDERS: `${name}/WS_GET_ORDERS`,
} as const;

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  owner?: string;
  __v?: number;
};

export type TOrdersResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

type TWSConnectionStartAction = {
  readonly type: typeof ActioFeedTypes.WS_CONNECTION_START;
};

type TWSConnectionSuccessAction = {
  readonly type: typeof ActioFeedTypes.WS_CONNECTION_SUCCESS;
};

type TWSConnectionErrorAction = {
  readonly type: typeof ActioFeedTypes.WS_CONNECTION_ERROR;
  payload: string;
};

type TWSConnectionClosedAction = {
  readonly type: typeof ActioFeedTypes.WS_CONNECTION_CLOSED;
};

type TWSGetOrdersAction = {
  readonly type: typeof ActioFeedTypes.WS_GET_ORDERS;
  payload: TOrdersResponse;
};

export type TFeedActions =
  | TWSConnectionStartAction
  | TWSConnectionSuccessAction
  | TWSConnectionErrorAction
  | TWSConnectionClosedAction
  | TWSGetOrdersAction;

export type TWSFeedActions = {
  wsInit: typeof ActioFeedTypes.WS_CONNECTION_START;
  onOpen: typeof ActioFeedTypes.WS_CONNECTION_SUCCESS;
  onClose: typeof ActioFeedTypes.WS_CONNECTION_CLOSED;
  onError: typeof ActioFeedTypes.WS_CONNECTION_ERROR;
  onMessage: typeof ActioFeedTypes.WS_GET_ORDERS;
};

export const wsConnectionStart = (): TWSConnectionStartAction => ({
  type: ActioFeedTypes.WS_CONNECTION_START,
});

export const wsConnectionSuccess = (): TWSConnectionSuccessAction => ({
  type: ActioFeedTypes.WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (error: string): TWSConnectionErrorAction => ({
  type: ActioFeedTypes.WS_CONNECTION_ERROR,
  payload: error,
});

export const wsConnectionClosed = (): TWSConnectionClosedAction => ({
  type: ActioFeedTypes.WS_CONNECTION_CLOSED,
});

export const wsGetOrders = (orders: TOrdersResponse): TWSGetOrdersAction => ({
  type: ActioFeedTypes.WS_GET_ORDERS,
  payload: orders,
});
