import { ActionUsersTypes, TAuthActions } from "../actions/auth";
import { TUser } from "../../utils/types";

type TUserInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TUserInitialState = {
  user: null,
  isAuthChecked: false,
};

export const userReducers = (
  state: TUserInitialState = initialState,
  action: TAuthActions
): TUserInitialState => {
  switch (action.type) {
    case ActionUsersTypes.SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case ActionUsersTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
