import { api } from "../../utils/api";
import { TUser } from "../../utils/types";
import { TRootState } from "../store";
import { ThunkAction } from "redux-thunk";

export const name = "user";

export const ActionUsersTypes = {
  SET_AUTH_CHECKED: `${name}/SET_AUTH_CHECKED`,
  SET_USER: `${name}/SET_USER`,
} as const;

type TSetAuthCheckedAction = {
  readonly type: typeof ActionUsersTypes.SET_AUTH_CHECKED;
  payload: boolean;
};

type TSetUserAction = {
  readonly type: typeof ActionUsersTypes.SET_USER;
  payload: TUser | null;
};

export type TAuthActions = TSetAuthCheckedAction | TSetUserAction;

export const setAuthChecked = (value: boolean): TSetAuthCheckedAction => ({
  type: ActionUsersTypes.SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser | null): TSetUserAction => ({
  type: ActionUsersTypes.SET_USER,
  payload: user,
});

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  TAuthActions
>;

export const getUser = (): AppThunk<Promise<void>> => {
  return (dispatch) => {
    return api.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const registeration = (form: {
  email: string;
  password: string;
  name: string;
}): AppThunk<Promise<void>> => {
  return (dispatch) => {
    return api.registerationRequest(form).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const login = (form: {
  email: string;
  password: string;
}): AppThunk<Promise<void>> => {
  return (dispatch) => {
    return api.loginRequest(form).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const checkUserAuth = (): AppThunk<Promise<void>> => {
  return (dispatch) => {
    return new Promise((resolve) => {
      if (localStorage.getItem("accessToken")) {
        dispatch(getUser())
          .catch(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
          })
          .finally(() => {
            dispatch(setAuthChecked(true));
            resolve();
          });
      } else {
        dispatch(setAuthChecked(true));
        resolve();
      }
    });
  };
};

export const logout = (): AppThunk<Promise<void>> => {
  return (dispatch) => {
    return api.logoutRequest().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};

export const updateUser = (form: {
  email?: string;
  password?: string;
  name?: string;
}): AppThunk<Promise<void>> => {
  return (dispatch) => {
    return api.updateUser(form).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};
