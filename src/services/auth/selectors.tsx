import { RootState } from "../store";

export const getAuthInfo = (state: RootState) => state.user;