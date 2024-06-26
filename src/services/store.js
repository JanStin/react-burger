import { compose, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./reduces";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(reducer, enhancer);
