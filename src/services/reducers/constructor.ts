import {
  ActionConstructorTypes,
  TConstructurActions,
} from "../actions/constructor";
import { TIngredient } from "../../utils/types";

type TConstructorInitialState = {
  ingredients: Array<TIngredient>;
  bun: null | TIngredient;
};

export const initialState: TConstructorInitialState = {
  ingredients: [],
  bun: null,
};

export const constructorIngredients = (
  state: TConstructorInitialState = initialState,
  action: TConstructurActions
): TConstructorInitialState => {
  switch (action.type) {
    case ActionConstructorTypes.ADD_BUN:
      return {
        ...state,
        bun: action.bun,
      };
    case ActionConstructorTypes.REMOVE_BUN:
      return {
        ...state,
        bun: null,
      };
    case ActionConstructorTypes.ADD_INGREDIENT:
      if (state.ingredients !== undefined && Array.isArray(state.ingredients)) {
        return {
          ...state,
          ingredients: [...state.ingredients, action.item],
        };
      } else {
        return {
          ...state,
          ingredients: [action.item],
        };
      }
    case ActionConstructorTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.key !== action.key
        ),
      };
    case ActionConstructorTypes.CHANGE_ORDER_INGREDIENTS:
      const updatedIngredients = [...state.ingredients];
      const [movedIngredient] = updatedIngredients.splice(action.fromIndex, 1);
      updatedIngredients.splice(action.toIndex, 0, movedIngredient);

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    default:
      return state;
  }
};
