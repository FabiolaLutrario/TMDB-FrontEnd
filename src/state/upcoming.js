import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUpcoming = createAction("SET_Upcoming");

const initialState = [];

export default createReducer(initialState, {
  [setUpcoming]: (state, action) => action.payload,
});
