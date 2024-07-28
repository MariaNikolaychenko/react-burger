import { RootState } from "../types";

export const getAuthInfo = (state: RootState) => state.user;