import { createOrderApi, getOrderByNumberApi } from "../../utils/api";
import { CLEAR_CONSTRUCTOR, GET_ORDER_BY_NUMBER_FAILED, GET_ORDER_BY_NUMBER_LOADING, GET_ORDER_BY_NUMBER_SUCCESS, NEW_ORDER_FAILED, NEW_ORDER_LOADING, NEW_ORDER_SUCCESS } from "../constants";
import { AppDispatch } from "../types";


export const createOrderAction = (order: string[]) => (dispatch: AppDispatch) => {
	dispatch({ type: NEW_ORDER_LOADING });

	createOrderApi(order)
		.then((res: any) => {
			if (res && res.success) {
				dispatch({
					type: NEW_ORDER_SUCCESS,
					order: res.order
				});
				dispatch({
					type: CLEAR_CONSTRUCTOR
				});
				
			} else {
				dispatch({
					type: NEW_ORDER_FAILED
				});
			}
		})
		.catch(console.error);
}

export const getOrderByNumberAction = (id: string) => (dispatch: AppDispatch) => {
	dispatch({ type: GET_ORDER_BY_NUMBER_LOADING});

	getOrderByNumberApi(id)
		.then((res: any) => {
			if (res && res.success) {
				dispatch({
					type: GET_ORDER_BY_NUMBER_SUCCESS,
					payload: res.orders[0]
				});
				
			} else {
				dispatch({
					type: GET_ORDER_BY_NUMBER_FAILED
				});
			}
		})
		.catch(console.error);
}