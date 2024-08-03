import { reducerIngredients } from "./reducers/ingredientsData";
import { constructorIngredients } from "./reducers/constructor";
import { orderIngredients } from "./reducers/order";
import { userReducers } from "./reducers/auth";
import { name as ingredients } from "./actions/ingredientsData";
import { name as constructor } from "./actions/constructor";
import { name as order } from "./actions/order";
import { name as user } from "./actions/auth";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  [ingredients]: reducerIngredients,
  [constructor]: constructorIngredients,
  [order]: orderIngredients,
  [user]: userReducers,
});
