import { createOrderApi } from "../../utils/api";
import { CLEAR_CONSTRUCTOR, NEW_ORDER_FAILED, NEW_ORDER_LOADING, NEW_ORDER_SUCCESS } from "../constants";
import { AppDispatch } from "../types";


export const createOrderAction = (order: string[]) => (dispatch: AppDispatch) => {
	dispatch({ type: NEW_ORDER_LOADING });

	createOrderApi(order)
		.then(res => {
			// @ts-ignore
			if (res && res.success) {
				dispatch({
					type: NEW_ORDER_SUCCESS,
					// @ts-ignore
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