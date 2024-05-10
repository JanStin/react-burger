import { reducerIngredients } from "./reducers/ingredientsData";
import { constructorIngredients } from "./reducers/constructor";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  ingredients: reducerIngredients,
  constructor: constructorIngredients
});
