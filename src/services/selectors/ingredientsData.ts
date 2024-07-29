import { name } from "../actions/ingredientsData";
import { TRootState } from "../../utils/types";

export const getIngredients = (store: TRootState) => store[name].ingredients;
export const getLoading = (store: TRootState) => store[name].loading;
export const getError = (store: TRootState) => store[name].error;
export const getPopupData = (store: TRootState) => store[name].popupData;
export const getPopupIsOpen = (store: TRootState) => store[name].popupIsOpen;
