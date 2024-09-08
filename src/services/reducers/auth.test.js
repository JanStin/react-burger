import { userReducers, initialState } from './auth';
import { ActionUsersTypes } from '../actions/auth';

describe('userReducers', () => {
  const mockUser = {
    email: 'test@example.com',
    name: 'Test User',
  };

  it('should return the initial state', () => {
    expect(userReducers(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_AUTH_CHECKED', () => {
    expect(
      userReducers(initialState, {
        type: ActionUsersTypes.SET_AUTH_CHECKED,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      isAuthChecked: true,
    });

    expect(
        userReducers(initialState, {
          type: ActionUsersTypes.SET_AUTH_CHECKED,
          payload: false,
        })
      ).toEqual({
        ...initialState,
        isAuthChecked: false,
      });
  });

  it('should handle SET_USER', () => {
    expect(
      userReducers(initialState, {
        type: ActionUsersTypes.SET_USER,
        payload: mockUser,
      })
    ).toEqual({
      ...initialState,
      user: mockUser,
    });
  });

  it('should handle SET_USER with null', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
    };

    expect(
      userReducers(stateWithUser, {
        type: ActionUsersTypes.SET_USER,
        payload: null,
      })
    ).toEqual({
      ...initialState,
      user: null,
    });
  });
});
