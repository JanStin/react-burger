import { feedReducer, initialState } from './feed';
import { ActionFeedTypes } from '../actions/feed';

describe('feedReducer', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      feedReducer(initialState, {
        type: ActionFeedTypes.WS_CONNECTION_SUCCESS,
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
      feedReducer(initialState, {
        type: ActionFeedTypes.WS_CONNECTION_ERROR,
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
      feedReducer(modifiedState, {
        type: ActionFeedTypes.WS_CONNECTION_CLOSED,
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
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
          status: 'done',
          name: 'Burger',
          createdAt: '2024-08-07T14:41:29.355Z',
          updatedAt: '2024-08-07T14:41:29.355Z',
          number: 1,
        },
      ],
      total: 1,
      totalToday: 1,
    };

    expect(
      feedReducer(initialState, {
        type: ActionFeedTypes.WS_GET_ORDERS,
        payload: orders,
      })
    ).toEqual({
      ...initialState,
      orders: orders,
    });
  });
});
