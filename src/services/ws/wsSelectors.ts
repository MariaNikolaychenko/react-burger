import { RootState } from "../types";

export const getWsOrders = (state: RootState) => state.allOrders.messages || [];
export const getWsUserOrders = (state: RootState) => state.userOrders.messages || [];
export const getWsOrdersConnected = (state: RootState) => state.allOrders.wsConnected;
export const getWsUserOrdersConnected = (state: RootState) => state.userOrders.wsConnected;