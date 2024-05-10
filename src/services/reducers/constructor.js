import {
  ADD_BUN,
  REMOVE_BUN,
  ADD_INGREDIANT,
  REMOVE_INGREDIANT,
  CHANGE_ORDER_INGREDIANTS,
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
    case ADD_INGREDIANT:
      return {
        ...state,
        ingredients: [...state.ingredients].push(action.item),
      };
    case REMOVE_INGREDIANT:
      return {
        ...state,
        ingredients: [...state.ingredients].map(
          (item) => item.key !== action.key
        )[0],
      };
    // https://youtu.be/P6RZtgqRhZc?si=nY7qWJvTQN4eKngy&t=2147
    case CHANGE_ORDER_INGREDIANTS:
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
