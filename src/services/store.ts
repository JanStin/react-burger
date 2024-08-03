import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reduces";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { TIngredientsActions } from "./actions/ingredientsData";
import { TConstructurActions } from "./actions/constructor";
import { TOrderActions } from "./actions/order";
import { TAuthActions } from "./actions/auth";

export type TRootState = ReturnType<typeof rootReducer>;

// Объединение всех типов действий в один
export type TAppActions =
  | TAuthActions
  | TOrderActions
  | TConstructurActions
  | TIngredientsActions;

// Типизация thunk действия
export type TAppThunk<TReturnType = void> = ThunkAction<
  TReturnType,
  TRootState,
  unknown,
  TAppActions
>;

// Типизация dispatch с thunk
type TAppDispatch = ThunkDispatch<TRootState, unknown, TAppActions>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

// Экспорт типизированных версий useDispatch и useSelector
export const useDispatch: () => TAppDispatch = dispatchHook as () => TAppDispatch;
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
