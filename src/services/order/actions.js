import { createOrderApi } from "../../utils/api";

export const NEW_ORDER_REQUEST = 'NEW_ORDER_REQUEST';
export const NEW_ORDER_SUCCESS = 'NEW_ORDER_SUCCESS';
export const NEW_ORDER_FAILED = 'NEW_ORDER_FAILED';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const createOrderAction = (order) => (dispatch) => {
	dispatch({ type: NEW_ORDER_REQUEST });

	createOrderApi(order)
		.then(res => {
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