import { reducerIngredients } from "./reducers/ingredientsData";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  ingredients: reducerIngredients,
});
