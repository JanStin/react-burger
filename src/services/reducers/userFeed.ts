import { TOrdersResponse } from "../../utils/types";
import {
  ActionUserFeedTypes,
  TUserFeedActions,
} from "../actions/userFeed";

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

export const userFeedReducer = (
  state = initialState,
  action: TUserFeedActions
): TOrdersState => {
  switch (action.type) {
    case ActionUserFeedTypes.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };
    case ActionUserFeedTypes.WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case ActionUserFeedTypes.WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case ActionUserFeedTypes.WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
