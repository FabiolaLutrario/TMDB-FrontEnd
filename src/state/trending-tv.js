import { createAction, createReducer } from "@reduxjs/toolkit";

export const setTrendingTv = createAction("SET_TRENDINGTV");

const initialState = [];

export default createReducer(initialState, {
  [setTrendingTv]: (state, action) => action.payload,
});
