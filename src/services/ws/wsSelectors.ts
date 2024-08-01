import { RootState } from "../types";

export const getWsMessage = (state: RootState) => state.wsReducer.messages || [];
export const getWsConnected = (state: RootState) => state.wsReducer.wsConnected;