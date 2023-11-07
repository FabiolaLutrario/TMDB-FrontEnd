import { createAction, createReducer } from "@reduxjs/toolkit";

export const setTrending = createAction("SET_TRENDING");

const initialState = [];

export default createReducer(initialState, {
  [setTrending]: (state, action) => action.payload,
});
