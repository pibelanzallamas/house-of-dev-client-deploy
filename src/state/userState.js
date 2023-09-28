import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  id: null,
  email: null,
  name: null,
  admin: null,
  telephone: null,
};

const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    return { ...state, ...action.payload };
  },
});

export default userReducer;
