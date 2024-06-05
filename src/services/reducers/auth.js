import { SET_AUTH_CHECKED } from "../actions/auth";

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        loading: true,
        error: false,
      };
    default:
      return state;
  }
};
