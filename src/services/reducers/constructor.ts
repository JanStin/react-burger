import { ActionTypes, TConstructurActions } from "../actions/constructor";
import { TIngredient } from "../../utils/types";

type TConstructorInitialState = {
  ingredients: TIngredient[];
  bun: null | TIngredient;
};

const initialState: TConstructorInitialState = {
  ingredients: [],
  bun: null,
};

export const constructorIngredients = (
  state: TConstructorInitialState = initialState,
  action: TConstructurActions
): TConstructorInitialState => {
  switch (action.type) {
    case ActionTypes.ADD_BUN:
      return {
        ...state,
        bun: action.payload,
      };
    case ActionTypes.REMOVE_BUN:
      return {
        ...state,
        bun: null,
      };
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    // ingredients = [];
    // if (state.ingredients !== undefined && Array.isArray(state.ingredients)) {
    //   ingredients = state.ingredients;
    // }
    // ingredients.push(action.payload);

    // return {
    //   ...state,
    //   ingredients: ingredients,
    // };
    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.key !== action.payload
        ),
      };
    // ingredients = state.ingredients;

    // const deleteIndex = ingredients.findIndex(
    //   (element) => element.key === action.payload
    // );
    // if (deleteIndex !== -1) {
    //   ingredients.splice(deleteIndex, 1);
    // }

    // return {
    //   ...state,
    //   ingredients: ingredients,
    // };
    case ActionTypes.CHANGE_ORDER_INGREDIENTS:
      const updatedIngredients = [...state.ingredients];
      const [movedIngredient] = updatedIngredients.splice(action.fromIndex, 1);
      updatedIngredients.splice(action.toIndex, 0, movedIngredient);

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    // ingredients = state.ingredients;
    // ingredients.splice(
    //   action.toIndex,
    //   0,
    //   ingredients.splice(action.fromIndex, 1)[0]
    // );
    // ingredients = ingredients.filter(
    //   (ingredient) => ingredient !== undefined
    // );
    // return {
    //   ...state,
    //   ingredients: ingredients,
    // };
    default:
      return state;
  }
};
