import type { Middleware, MiddlewareAPI } from 'redux';

import { AppDispatch, RootState, TWSActions, TWSStoreActions } from '../types';
import { getCookie, setCookie } from '../../utils/cookie';
import { refreshTokenApi } from '../../utils/api';

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		let isConnected = false;
        let reconnectTimer = 0;
		const {
			wsInit, 
			wsSendMessage, 
			onOpen, 
			onClose, 
			onError, 
			onMessage,
			disconnect
		} = wsActions;
		let url = '';
		let withTokenRefresh = false;

		return next => (action: TWSActions) => {
			const { dispatch } = store;
			
			if (action.type === wsInit) {
				url = action.url;

				if (action.useToken) {
					url += `?token=${getCookie('token')}`;
					withTokenRefresh = true;
				}

				socket = new WebSocket(url);
				isConnected = true;
			}

			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event: MessageEvent) => {
					const { data } = event;
					const parsedData = JSON.parse(data);

					if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
						refreshTokenApi()
						    .then((refreshData: any) => {
								setCookie('token', refreshData.accessToken.split('Bearer ')[1]);
								localStorage.setItem('refreshToken', refreshData.refreshToken);
						        dispatch({type: wsInit, url: url, useToken: withTokenRefresh});
						    })
						    .catch((err) => {
								dispatch({ type: onError, payload: err });
							});
						dispatch({type: disconnect});
						return;
					}

					dispatch({ type: onMessage, payload: parsedData });
				};

				socket.onclose = () => {
					dispatch({ type: onClose });

					if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
							dispatch({type: wsInit, url: url, useToken: withTokenRefresh});
                        }, RECONNECT_PERIOD);
                    }
				};

				if (action.type === wsSendMessage) {
					const payload = action.payload;
					const message = { ...payload, token: getCookie('token') };
					socket.send(JSON.stringify(message));
				}
			}

			if (socket && (action.type === disconnect)) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				reconnectTimer = 0;
				socket.close();
				socket = null;
			}

			next(action);
		};
	}) as Middleware;
};