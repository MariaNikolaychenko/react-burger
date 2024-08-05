import { rootReducer } from "./reducer";
import { socketMiddleware } from './middleware/socketMiddleware';
import { configureStore } from '@reduxjs/toolkit';
import { wsAllOrdersAction, wsUserOrdersAction } from "./types";


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(socketMiddleware(wsAllOrdersAction))
        .concat(socketMiddleware(wsUserOrdersAction))
});