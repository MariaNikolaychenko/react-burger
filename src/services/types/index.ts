import { ThunkAction } from "redux-thunk";
import { TAuthActions } from "../auth/types";
import { TBurgerConstructorActions } from "../burger-constructor/types";
import { TIngredientsAction } from "../burger-ingredients/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_USER_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../constants";
import { TCurrentIngredientActions } from "../ingredient/types";
import { TOrderActions } from "../order/types";
import { rootReducer } from "../reducer";
import { store } from "../store";
import { TIngredient } from "../../utils/types";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export type TAppActions =
	| TAuthActions
	| TBurgerConstructorActions
	| TIngredientsAction
	| TCurrentIngredientActions
	| TOrderActions

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionUserStart {
  readonly type: typeof WS_CONNECTION_USER_START;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: {message: string};
}

export type TWSActions =
	| IWSConnectionStart
	| IWSConnectionUserStart
	| IWSConnectionSuccessAction
	| IWSConnectionErrorAction
	| IWSConnectionClosedAction
	| IWSGetMessageAction
	| IWSSendMessageAction;

export type AppActions = TWSActions | TAppActions;

export type TWSStoreActions = {
	wsInit: typeof  WS_CONNECTION_START,
	wsInitUser: typeof  WS_CONNECTION_USER_START,
	wsSendMessage: typeof  WS_SEND_MESSAGE,
	onOpen: typeof  WS_CONNECTION_SUCCESS,
	onClose: typeof WS_CONNECTION_CLOSED,
	onError: typeof  WS_CONNECTION_ERROR,
	onMessage: typeof  WS_GET_MESSAGE,
};

export interface IWsOrders {
	createdAt: string,
	ingredients: TIngredient[] | string[],
	name: string,
	number: number,
	status: string,
	updatedAt: string,
	_id: string,
}
	
export interface IMessage {
	orders: IWsOrders[];
	total: number;
	totalToday: number;
}
