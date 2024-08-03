import { ActionOrderTypes, TOrderActions } from "../actions/order";

type TOrderIngredientsInitialState = {
  loading: boolean;
  error: string;
  isOpenPoup: boolean;
  order: number | null;
};

const initialState: TOrderIngredientsInitialState = {
  order: null,
  loading: false,
  error: "",
  isOpenPoup: false,
};

export const orderIngredients = (
  state: TOrderIngredientsInitialState = initialState,
  action: TOrderActions
): TOrderIngredientsInitialState => {
  switch (action.type) {
    case ActionOrderTypes.ORDER_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ActionOrderTypes.ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionOrderTypes.ORDER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        isOpenPoup: true,
      };
    case ActionOrderTypes.CLOSE_ORDER:
      return {
        ...state,
        order: null,
        loading: false,
        error: "",
        isOpenPoup: false,
      };
    default:
      return state;
  }
};
