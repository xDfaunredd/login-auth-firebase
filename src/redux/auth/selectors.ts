import { RootState } from "../store";

export const selectIsLogged = (state: RootState) => state.auth.isLogged;
export const selectEmail = (state: RootState) => state.auth.email;
