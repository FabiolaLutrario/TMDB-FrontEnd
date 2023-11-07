import { createAction, createReducer } from "@reduxjs/toolkit";

export const setActorsTrending = createAction("SET_ACTORSTRENDING");

const initialState = [];

export default createReducer(initialState, {
  [setActorsTrending]: (state, action) => action.payload,
});
