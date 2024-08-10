import { orderIngredients, initialState } from "./order";
import { ActionOrderTypes } from "../actions/order";

describe("orderIngredients reducer", () => {
  it("should return the initial state", () => {
    expect(orderIngredients(undefined, {})).toEqual(initialState);
  });

  it("should handle ORDER_LOADING", () => {
    expect(
      orderIngredients(initialState, {
        type: ActionOrderTypes.ORDER_LOADING,
      })
    ).toEqual({
      ...initialState,
      loading: true,
      error: "",
    });
  });

  it("should handle ORDER_ERROR", () => {
    const error = "Something went wrong";
    expect(
      orderIngredients(initialState, {
        type: ActionOrderTypes.ORDER_ERROR,
        payload: error,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: error,
    });
  });

  it("should handle ORDER_LOAD_SUCCESS", () => {
    const orderResponse = {
      success: true,
      name: "Test Order",
      order: {
        number: 48000,
      },
    };

    expect(
      orderIngredients(initialState, {
        type: ActionOrderTypes.ORDER_LOAD_SUCCESS,
        payload: orderResponse,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      order: orderResponse,
      isOpenPoup: true,
    });
  });

  it("should handle CLOSE_ORDER", () => {
    const orderResponse = {
      loading: false,
      error: "",
      isOpenPoup: true,
      order: {
        success: true,
        name: "Test Order",
        order: {
          number: 48000,
        },
      }
    };

    expect(
      orderIngredients(orderResponse, {
        type: ActionOrderTypes.CLOSE_ORDER,
      })
    ).toEqual({
      order: null,
      loading: false,
      error: "",
      isOpenPoup: false,
    });
  });
});
