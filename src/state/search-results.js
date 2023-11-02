import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSearchResults = createAction("SET_SEARCH_RESULTS");

const initialState = [];

export default createReducer(initialState, {
  [setSearchResults]: (state, action) => action.payload,
});
