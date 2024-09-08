import { userFeedReducer, initialState } from './userFeed';
import { ActionUserFeedTypes } from '../actions/userFeed';

describe('userFeedReducer', () => {
  it('should return the initial state', () => {
    expect(userFeedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      userFeedReducer(initialState, {
        type: ActionUserFeedTypes.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: null,
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    const error = 'WebSocket connection error';
    expect(
      userFeedReducer(initialState, {
        type: ActionUserFeedTypes.WS_CONNECTION_ERROR,
        payload: error,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: error,
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    const modifiedState = {
      ...initialState,
      wsConnected: true,
    };
    expect(
      userFeedReducer(modifiedState, {
        type: ActionUserFeedTypes.WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it('should handle WS_GET_ORDERS', () => {
    const orders = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: ['ingredient1', 'ingredient2'],
          status: 'done',
          name: 'Order 1',
          createdAt: '2023-07-19T12:00:00Z',
          updatedAt: '2023-07-19T12:00:00Z',
          number: 1,
        },
      ],
      total: 1,
      totalToday: 1,
    };

    expect(
      userFeedReducer(initialState, {
        type: ActionUserFeedTypes.WS_GET_ORDERS,
        payload: orders,
      })
    ).toEqual({
      ...initialState,
      orders: orders,
    });
  });
});
