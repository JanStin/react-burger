import { reducerIngredients, initialState } from './ingredientsData';
import { ActionIngredientsTypes } from '../actions/ingredientsData';

describe('reducerIngredients', () => {
  const mockIngredient = {
    _id: '1',
    name: 'Test ingredient',
    type: 'main',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 100,
    image: 'image.jpg',
    image_mobile: 'image_mobile.jpg',
    image_large: 'image_large.jpg',
    __v: 0,
  };

  it('should return the initial state', () => {
    expect(reducerIngredients(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADING_INGREDIENTS', () => {
    expect(
      reducerIngredients(initialState, {
        type: ActionIngredientsTypes.LOADING_INGREDIENTS,
      })
    ).toEqual({
      ...initialState,
      loading: true,
      error: '',
    });
  });

  it('should handle ERROR_INGREDIENTS', () => {
    const errorMessage = 'Error loading ingredients';
    expect(
      reducerIngredients(initialState, {
        type: ActionIngredientsTypes.ERROR_INGREDIENTS,
        payload: errorMessage,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage,
    });
  });

  it('should handle INGREDIENTS_LOAD_SUCCESS', () => {
    const ingredients = [mockIngredient];
    expect(
      reducerIngredients(initialState, {
        type: ActionIngredientsTypes.INGREDIENTS_LOAD_SUCCESS,
        payload: ingredients,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      ingredients: ingredients,
    });
  });

  it('should handle GET_INGREDIENT with valid id', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockIngredient],
    };
    expect(
      reducerIngredients(stateWithIngredients, {
        type: ActionIngredientsTypes.GET_INGREDIENT,
        id: mockIngredient._id,
      })
    ).toEqual({
      ...stateWithIngredients,
      popupData: mockIngredient,
    });
  });

  it('should handle GET_INGREDIENT with invalid id', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockIngredient],
    };
    expect(
      reducerIngredients(stateWithIngredients, {
        type: ActionIngredientsTypes.GET_INGREDIENT,
        id: 'invalid_id',
      })
    ).toEqual({
      ...stateWithIngredients,
      popupData: null,
    });
  });

  it('should handle OPEN_POPUP', () => {
    expect(
      reducerIngredients(initialState, {
        type: ActionIngredientsTypes.OPEN_POPUP,
      })
    ).toEqual({
      ...initialState,
      popupIsOpen: true,
    });
  });

  it('should handle CLOSE_POPUP', () => {
    const stateWithPopupOpen = {
      ...initialState,
      popupData: mockIngredient,
      popupIsOpen: true,
    };
    expect(
      reducerIngredients(stateWithPopupOpen, {
        type: ActionIngredientsTypes.CLOSE_POPUP,
      })
    ).toEqual({
      ...initialState,
      popupData: null,
      popupIsOpen: false,
    });
  });

  it('should handle INCREASE_INGREDIENT', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [{ ...mockIngredient }],
    };
    expect(
      reducerIngredients(stateWithIngredients, {
        type: ActionIngredientsTypes.INCREASE_INGREDIENT,
        id: mockIngredient._id,
      })
    ).toEqual({
      ...stateWithIngredients,
      ingredients: [{ ...mockIngredient, count: 1 }],
    });
  });

  it('should handle DECREASE_INGREDIENT and not allow negative count', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [{ ...mockIngredient, count: 1 }],
    };
    expect(
      reducerIngredients(stateWithIngredients, {
        type: ActionIngredientsTypes.DECREASE_INGREDIENT,
        id: mockIngredient._id,
      })
    ).toEqual({
      ...stateWithIngredients,
      ingredients: [{ ...mockIngredient, count: 0 }],
    });
  });

  it('should handle DECREASE_INGREDIENT when count is already zero', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [{ ...mockIngredient, count: 0 }],
    };
    expect(
      reducerIngredients(stateWithIngredients, {
        type: ActionIngredientsTypes.DECREASE_INGREDIENT,
        id: mockIngredient._id,
      })
    ).toEqual({
      ...stateWithIngredients,
      ingredients: [{ ...mockIngredient, count: 0 }],
    });
  });
});
