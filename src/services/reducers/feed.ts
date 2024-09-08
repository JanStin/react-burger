import { TOrdersResponse } from "../../utils/types";
import {
  ActionFeedTypes,
  TFeedActions,
} from "../actions/feed";

type TOrdersState = {
  orders: TOrdersResponse | null;
  wsConnected: boolean;
  error: string | null;
};

export const initialState: TOrdersState = {
  orders: null,
  wsConnected: false,
  error: null,
};

export const feedReducer = (
  state = initialState,
  action: TFeedActions
): TOrdersState => {
  switch (action.type) {
    case ActionFeedTypes.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };
    case ActionFeedTypes.WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case ActionFeedTypes.WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case ActionFeedTypes.WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
