import { RootState } from "./../store";

export const selectIsLogged = (state: RootState) => state.auth.isLogged;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectName = (state: RootState) => state.auth.name;
export const selectID = (state: RootState) => state.auth.id;
