import { constructorIngredients, initialState } from './constructor';
import { ActionConstructorTypes } from '../actions/constructor';

describe('constructorIngredients reducer', () => {
  const mockBun = {
    _id: 'bun1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'bun.jpg',
    image_mobile: 'bun_mobile.jpg',
    image_large: 'bun_large.jpg',
    __v: 0,
  };

  const mockIngredient = {
    _id: 'ingredient1',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 30,
    calories: 200,
    price: 100,
    image: 'ingredient.jpg',
    image_mobile: 'ingredient_mobile.jpg',
    image_large: 'ingredient_large.jpg',
    __v: 0,
    key: 'key1',
  };

  it('should return the initial state', () => {
    expect(constructorIngredients(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_BUN', () => {
    expect(
      constructorIngredients(initialState, {
        type: ActionConstructorTypes.ADD_BUN,
        bun: mockBun,
      })
    ).toEqual({
      ...initialState,
      bun: mockBun,
    });
  });

  it('should handle REMOVE_BUN', () => {
    const stateWithBun = {
      ...initialState,
      bun: mockBun,
    };
    expect(
      constructorIngredients(stateWithBun, {
        type: ActionConstructorTypes.REMOVE_BUN,
      })
    ).toEqual({
      ...initialState,
      bun: null,
    });
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(
      constructorIngredients(initialState, {
        type: ActionConstructorTypes.ADD_INGREDIENT,
        item: mockIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredients: [mockIngredient],
    });
  });

  it('should handle REMOVE_INGREDIENT', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockIngredient],
    };
    expect(
      constructorIngredients(stateWithIngredients, {
        type: ActionConstructorTypes.REMOVE_INGREDIENT,
        key: mockIngredient.key,
      })
    ).toEqual({
      ...initialState,
      ingredients: [],
    });
  });

  it('should handle CHANGE_ORDER_INGREDIENTS', () => {
    const ingredient1 = { ...mockIngredient, key: 'key1', _id: '1' };
    const ingredient2 = { ...mockIngredient, key: 'key2', _id: '2' };
    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    };

    const newState = constructorIngredients(stateWithIngredients, {
      type: ActionConstructorTypes.CHANGE_ORDER_INGREDIENTS,
      fromIndex: 0,
      toIndex: 1,
    });

    expect(newState.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('should handle CHANGE_ORDER_INGREDIENTS with invalid indices', () => {
    const ingredient1 = { ...mockIngredient, key: 'key1', _id: '1' };
    const ingredient2 = { ...mockIngredient, key: 'key2', _id: '2' };
    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    };

    const newState = constructorIngredients(stateWithIngredients, {
      type: ActionConstructorTypes.CHANGE_ORDER_INGREDIENTS,
      fromIndex: -1,
      toIndex: 10,
    });

    expect(newState.ingredients).toEqual([ingredient1, ingredient2]);
  });
});
