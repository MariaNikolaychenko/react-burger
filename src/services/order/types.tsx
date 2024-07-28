// import { TIngredient } from "../../utils/types";
import { TIngredient } from "../../utils/types";
import { CLEAR_CONSTRUCTOR, NEW_ORDER_FAILED, NEW_ORDER_LOADING, NEW_ORDER_SUCCESS } from "../constants";

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
	order: TOrder | null
}

export interface INewOrderLoadingAction {
	order: any;
	readonly type: typeof NEW_ORDER_LOADING
};

export interface INewOrderSuccessAction {
	readonly type: typeof NEW_ORDER_SUCCESS;
	order: {
		name: any;
		number: any;
	}
};

export interface INewOrderFailedAction {
	readonly type: typeof NEW_ORDER_FAILED;
};

export interface IClearConstructorAction {
	readonly type: typeof CLEAR_CONSTRUCTOR;
};

export type TOrderActions = 
	INewOrderLoadingAction |
	INewOrderSuccessAction |
	INewOrderFailedAction |
	IClearConstructorAction;
