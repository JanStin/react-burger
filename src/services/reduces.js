import { reducerIngredients } from "./reducers/ingredientsData";
import { constructorIngredients } from "./reducers/constructor";
import { orderIngredients } from "./reducers/order";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  ingredients: reducerIngredients,
  constructor: constructorIngredients,
  order: orderIngredients,
});
