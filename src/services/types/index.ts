import { ThunkAction } from "redux-thunk";
import { TAuthActions } from "../auth/types";
import { TBurgerConstructorActions } from "../burger-constructor/types";
import { TIngredientsAction } from "../burger-ingredients/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_USER_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_CONNECT, WS_CONNECTING, WS_DISCONNECT, WS_USER_CONNECTION_SUCCESS, WS_USER_CONNECTION_ERROR, WS_USER_GET_MESSAGE, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECT, WS_USER_SEND_MESSAGE, WS_USER_DISCONNECT } from "../constants";
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

// All orders
export interface IWSConnect {
  readonly type: typeof WS_CONNECT;
}
export interface IWSConnectionStart {
	readonly type: typeof WS_CONNECTION_START;
	readonly url: string;
	readonly useToken?: boolean;
}
export interface IWSUserConnectionStart {
	readonly type: typeof WS_USER_CONNECTION_START;
	readonly url: string;
	readonly useToken?: boolean;
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
export interface IWSConnectingAction {
	readonly type: typeof WS_CONNECTING;
	readonly payload: {message: string};
}
export interface IWSDisconnectAction {
	readonly type: typeof WS_DISCONNECT;
}
// User Orders
export interface IWSUserConnect {
  readonly type: typeof WS_USER_CONNECT;
}
export interface IWSUserSendMessageAction {
  readonly type: typeof WS_USER_SEND_MESSAGE;
  readonly payload: {message: string};
}
export interface IWSUserConnectionSuccessAction
{
	readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
export interface IWSUserConnectionErrorAction
{
	readonly type: typeof WS_USER_CONNECTION_ERROR;
	readonly payload: Event;
}
export interface IWSUserConnectionClosedAction
{
	readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
export interface IWSUserGetMessageAction
{
	readonly type: typeof WS_USER_GET_MESSAGE;
	readonly payload: any;
}
export interface IWSUserDisconnectAction {
  readonly type: typeof WS_USER_DISCONNECT;
}


export type TWSActions =
	| IWSConnect
	| IWSConnectionStart
	| IWSConnectionSuccessAction
	| IWSConnectionErrorAction
	| IWSConnectionClosedAction
	| IWSGetMessageAction
	| IWSSendMessageAction
	| IWSDisconnectAction
	| IWSUserConnect
	| IWSUserConnectionStart
	| IWSUserConnectionSuccessAction
	| IWSUserConnectionErrorAction
	| IWSUserConnectionClosedAction
	| IWSUserGetMessageAction
	| IWSUserSendMessageAction
	| IWSUserDisconnectAction;

export type AppActions = TWSActions | TAppActions;

export type TWSAllOrdersActions = {
	connect: typeof WS_CONNECT,
	wsInit: typeof  WS_CONNECTION_START,
	wsSendMessage: typeof  WS_SEND_MESSAGE,
	onOpen: typeof  WS_CONNECTION_SUCCESS,
	onClose: typeof WS_CONNECTION_CLOSED,
	onError: typeof  WS_CONNECTION_ERROR,
	onMessage: typeof  WS_GET_MESSAGE,
	disconnect: typeof WS_DISCONNECT
};
export type TWSUserOrdersActions = {
	connect: typeof WS_USER_CONNECT,
	wsInit: typeof  WS_USER_CONNECTION_START,
	wsSendMessage: typeof  WS_USER_SEND_MESSAGE,
	onOpen: typeof  WS_USER_CONNECTION_SUCCESS,
	onClose: typeof WS_USER_CONNECTION_CLOSED,
	onError: typeof  WS_USER_CONNECTION_ERROR,
	onMessage: typeof  WS_USER_GET_MESSAGE,
	disconnect: typeof WS_USER_DISCONNECT
};

export const wsAllOrdersAction: TWSAllOrdersActions = {
	connect: WS_CONNECT,
	wsInit:  WS_CONNECTION_START,
	wsSendMessage:  WS_SEND_MESSAGE,
	onOpen:  WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError:  WS_CONNECTION_ERROR,
	onMessage:  WS_GET_MESSAGE,
	disconnect: WS_DISCONNECT
}

export const wsUserOrdersAction: TWSUserOrdersActions = {
	connect: WS_USER_CONNECT,
	wsInit:  WS_USER_CONNECTION_START,
	wsSendMessage:  WS_USER_SEND_MESSAGE,
	onOpen:  WS_USER_CONNECTION_SUCCESS,
	onClose: WS_USER_CONNECTION_CLOSED,
	onError:  WS_USER_CONNECTION_ERROR,
	onMessage:  WS_USER_GET_MESSAGE,
	disconnect: WS_USER_DISCONNECT
}
export type TWSStoreActions = TWSAllOrdersActions | TWSUserOrdersActions;
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
	orders: IWsOrders[] | [];
	total: number;
	totalToday: number;
}
