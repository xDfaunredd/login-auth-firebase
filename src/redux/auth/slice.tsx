import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  name: string;
  email: null;
  token: null;
  id: null;
  isLogged: boolean;
};

const initialState: InitialState = {
  name: "",
  email: null,
  token: null,
  id: null,
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLogged = true;
      state.name = action.payload.name;

      console.log(state.email);
      console.log(state.token);
      console.log(state.id);
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLogged = false;
      state.name = "";
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUser, removeUser } = authSlice.actions;
