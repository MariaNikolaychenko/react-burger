import { createOrderApi } from "../../utils/api";
import { AppDispatch } from "../store";

export const NEW_ORDER_LOADING = 'NEW_ORDER_LOADING';
export const NEW_ORDER_SUCCESS = 'NEW_ORDER_SUCCESS';
export const NEW_ORDER_FAILED = 'NEW_ORDER_FAILED';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const createOrderAction = (order: string[]) => (dispatch: AppDispatch) => {
	dispatch({ type: NEW_ORDER_LOADING });

	createOrderApi(order)
		.then(res => {
			// @ts-ignore
			if (res && res.success) {
				dispatch({
					type: NEW_ORDER_SUCCESS,
					order: res
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