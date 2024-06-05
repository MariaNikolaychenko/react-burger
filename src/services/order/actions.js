import { createOrderApi } from "../../utils/api";

export const NEW_ORDER_REQUEST = 'NEW_ORDER_REQUEST'
export const NEW_ORDER_SUCCESS = 'NEW_ORDER_SUCCESS'
export const NEW_ORDER_FAILED = 'NEW_ORDER_FAILED'

export const createOrderAction = (order) => (dispatch) => {
    dispatch({ type: NEW_ORDER_REQUEST });

	return createOrderApi(order)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: NEW_ORDER_SUCCESS,
            order: res
          });
        } else {
          dispatch({
            type: NEW_ORDER_FAILED
          });
        }
      })
      .catch((e) => console.log(`Ошибка сервера`, e));
}
