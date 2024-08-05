import {
  ActioFeedTypes,
  TFeedActions,
  TOrdersResponse,
} from "../actions/feed";

type TOrdersState = {
  orders: TOrdersResponse["orders"];
  wsConnected: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  wsConnected: false,
  error: null,
};

export const feedReducer = (
  state = initialState,
  action: TFeedActions
): TOrdersState => {
  switch (action.type) {
    case ActioFeedTypes.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };
    case ActioFeedTypes.WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case ActioFeedTypes.WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case ActioFeedTypes.WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
      };
    default:
      return state;
  }
};
