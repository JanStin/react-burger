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
import { ActioFeedTypes, TFeedActions, TWSFeedActions } from "./actions/feed";
import { socketMiddleware } from "./middleware/socketMiddleware";

export type TRootState = ReturnType<typeof rootReducer>;

// Объединение всех типов действий в один
export type TAppActions =
  | TAuthActions
  | TOrderActions
  | TConstructurActions
  | TIngredientsActions
  | TFeedActions;

export type TWssAction = TFeedActions;
export type TWssStoreActions = TWSFeedActions;

// Типизация thunk действия
export type TAppThunk<TReturnType = void> = ThunkAction<
  TReturnType,
  TRootState,
  unknown,
  TAppActions
>;

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const feedActions: TWssStoreActions = {
  wsInit: ActioFeedTypes.WS_CONNECTION_START,
  onOpen: ActioFeedTypes.WS_CONNECTION_SUCCESS,
  onClose: ActioFeedTypes.WS_CONNECTION_CLOSED,
  onError: ActioFeedTypes.WS_CONNECTION_ERROR,
  onMessage: ActioFeedTypes.WS_GET_ORDERS,
};

// Типизация dispatch с thunk
export type TAppDispatch = ThunkDispatch<TRootState, unknown, TAppActions>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk, socketMiddleware(wsUrl, feedActions)),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

// Экспорт типизированных версий useDispatch и useSelector
export const useDispatch: () => TAppDispatch =
  dispatchHook as () => TAppDispatch;
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
