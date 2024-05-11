import {
  ADD_BUN,
  REMOVE_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CHANGE_ORDER_INGREDIENTS,
} from "../actions/constructor";

const initialState = {
  ingredients: [],
  bun: false,
};

export const constructorIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.bun,
      };
    case REMOVE_BUN:
      return {
        ...state,
        bun: false,
      };
    case ADD_INGREDIENT:
      let ingredients = [];
      if (state.ingredients !== undefined) {
        ingredients = state.ingredients;
      }
      ingredients.push(action.item);

      return {
        ...state,
        ingredients: ingredients,
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].map(
          (item) => item.key !== action.key
        )[0],
      };
    // https://youtu.be/P6RZtgqRhZc?si=nY7qWJvTQN4eKngy&t=2147
    case CHANGE_ORDER_INGREDIENTS:
      return {
        ...state,
        // popupData: [...state.ingredients].filter(
        //   (item) => item._id === action.id
        // )[0],
      };
    default:
      return state;
  }
};
