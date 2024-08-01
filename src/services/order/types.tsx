// import { TIngredient } from "../../utils/types";
import { TIngredient } from "../../utils/types";
import { CLEAR_CONSTRUCTOR, GET_ORDER_BY_NUMBER_FAILED, GET_ORDER_BY_NUMBER_LOADING, GET_ORDER_BY_NUMBER_SUCCESS, NEW_ORDER_FAILED, NEW_ORDER_LOADING, NEW_ORDER_SUCCESS } from "../constants";
import { IWsOrders } from "../types";

export type TOrder = {
    ingredients: Array<TIngredient>;
    _id: string;
    status: string;
    name: string;
    number: number;
	price: number;
    createdAt: string;
    updatedAt: string;
	owner?: {
		createdAt: string;
		updatedAt: string;
		email: string;
		name: string;
	}
}

export type TOrderState = {
	isOrderSuccess: boolean,
	isOrderLoading: boolean,
	isOrderFailed: boolean,
	isGetOrderByNumberLoading: boolean,
	isGetOrderByNumberSuccess: boolean,
	isGetOrderByNumberFailed: boolean,
	order: TOrder | null,
	currentOrder: TOrder | null
}

export interface INewOrderLoadingAction {
	readonly order: any;
	readonly type: typeof NEW_ORDER_LOADING
};

export interface INewOrderSuccessAction {
	readonly type: typeof NEW_ORDER_SUCCESS;
	readonly order: {
		name: string;
		number: number;
	}
};

export interface INewOrderFailedAction {
	readonly type: typeof NEW_ORDER_FAILED;
};
export interface IGetOrderByNumberFailedAction {
	readonly type: typeof GET_ORDER_BY_NUMBER_FAILED;
};
export interface IGetOrderByNumberLoadingAction {
	readonly type: typeof GET_ORDER_BY_NUMBER_LOADING;
};
export interface IGetOrderByNumberSuccessAction {
	payload: any;
	readonly type: typeof GET_ORDER_BY_NUMBER_SUCCESS;
};

export interface IClearConstructorAction {
	readonly type: typeof CLEAR_CONSTRUCTOR;
};

export type TOrderActions = 
	INewOrderLoadingAction |
	INewOrderSuccessAction |
	INewOrderFailedAction |
	IGetOrderByNumberLoadingAction |
	IGetOrderByNumberSuccessAction |
	IGetOrderByNumberFailedAction |
	IClearConstructorAction;
