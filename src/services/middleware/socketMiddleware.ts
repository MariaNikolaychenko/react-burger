import type { Middleware, MiddlewareAPI } from 'redux';

import { AppActions, AppDispatch, RootState, TWSStoreActions } from '../types';
import { getCookie, setCookie } from '../../utils/cookie';
import { refreshTokenApi } from '../../utils/api';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return next => (action: AppActions) => {
			const { dispatch, getState } = store;
			const { type } = action;
			const { 
				wsInit, 
				wsInitUser, 
				wsSendMessage, 
				onOpen, 
				onClose, 
				onError, 
				onMessage 
			} = wsActions;

			const user = getState().user;
			
			if (type === wsInit) {
				socket = new WebSocket(`${wsUrl}/all`);
			}

			if (type === wsInitUser && user.name) {
				socket = new WebSocket(
					`${wsUrl}?token=${getCookie('token')}`
				);
			}
			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event: MessageEvent) => {
					const { data } = event;
					const parsedData = JSON.parse(data);

					if (parsedData.message === "Invalid or missing token") {
						refreshTokenApi()
						    .then((refreshData: any) => {
								const authToken = refreshData.accessToken.split('Bearer ')[1];		
								setCookie('token', authToken);
								localStorage.setItem('refreshToken', refreshData.refreshToken);
						        dispatch({type: wsInitUser});
						    })
						    .catch((err) => {
								dispatch({ type: onError, payload: err });
							});
							dispatch({ type: onClose, payload: event});

						return;
					}

					dispatch({ type: onMessage, payload: parsedData });
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === wsSendMessage) {
					const payload = action.payload;
					const message = { ...payload, token: getCookie('token') };
					socket.send(JSON.stringify(message));
				}
			}

			next(action);
		};
	}) as Middleware;
};