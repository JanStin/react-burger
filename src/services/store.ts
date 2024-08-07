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
import { ActionFeedTypes, TFeedActions, TWSFeedActions } from "./actions/feed";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  ActionUserFeedTypes,
  TUserFeedActions,
  TWSUserFeedActions,
} from "./actions/userFeed";

export type TRootState = ReturnType<typeof rootReducer>;

// Объединение всех типов действий в один
export type TAppActions =
  | TAuthActions
  | TOrderActions
  | TConstructurActions
  | TIngredientsActions
  | TFeedActions
  | TUserFeedActions;

export type TWssAction = TFeedActions | TUserFeedActions;
export type TWssStoreActions = TWSFeedActions | TWSUserFeedActions;

// Типизация thunk действия
export type TAppThunk<TReturnType = void> = ThunkAction<
  TReturnType,
  TRootState,
  unknown,
  TAppActions
>;

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const feedActions: TWssStoreActions = {
  wsInit: ActionFeedTypes.WS_CONNECTION_START,
  onOpen: ActionFeedTypes.WS_CONNECTION_SUCCESS,
  onClose: ActionFeedTypes.WS_CONNECTION_CLOSED,
  onError: ActionFeedTypes.WS_CONNECTION_ERROR,
  onMessage: ActionFeedTypes.WS_GET_ORDERS,
};

const wsUserUrl = "wss://norma.nomoreparties.space/orders?token=";
const userFeedActions: TWssStoreActions = {
  wsInit: ActionUserFeedTypes.WS_CONNECTION_START,
  onOpen: ActionUserFeedTypes.WS_CONNECTION_SUCCESS,
  onClose: ActionUserFeedTypes.WS_CONNECTION_CLOSED,
  onError: ActionUserFeedTypes.WS_CONNECTION_ERROR,
  onMessage: ActionUserFeedTypes.WS_GET_ORDERS,
};

// Типизация dispatch с thunk
export type TAppDispatch = ThunkDispatch<TRootState, unknown, TAppActions>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(thunk)
      .concat(socketMiddleware(wsUrl, feedActions, false))
      .concat(socketMiddleware(wsUserUrl, userFeedActions, true)),
      // .concat(socketMiddleware(wsUrl, wsUserUrl, feedActions, userFeedActions)),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

// Экспорт типизированных версий useDispatch и useSelector
export const useDispatch: () => TAppDispatch =
  dispatchHook as () => TAppDispatch;
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
