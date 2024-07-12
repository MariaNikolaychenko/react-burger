import { TIngredient } from "../../utils/types";
import { CLEAR_CONSTRUCTOR, NEW_ORDER_FAILED, NEW_ORDER_LOADING, NEW_ORDER_SUCCESS } from "./actions";

export type TOrderState = {
	isOrderRequest: boolean,
	isOrderLoading: boolean,
	isOrderFailed: boolean,
	orderName: string | null,
	orderNumber: number | null
}

export interface INewOrderLoadingAction {
	type: typeof NEW_ORDER_LOADING;
	data: TIngredient
};

export interface INewOrderSuccessAction {
	type: typeof NEW_ORDER_SUCCESS;
	order: {
		name: string;
		order: {
			number: number;
		}
	}
};

export interface INewOrderFailedAction {
	type: typeof NEW_ORDER_FAILED;
	data: TIngredient
};

export interface IClearConstructorAction {
	type: typeof CLEAR_CONSTRUCTOR;
};

export type TOrderActions = 
	INewOrderLoadingAction |
	INewOrderSuccessAction |
	INewOrderFailedAction |
	IClearConstructorAction;
