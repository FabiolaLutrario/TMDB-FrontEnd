import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavoritesResults = createAction("SET_FAVORITES_RESULTS");

export const addToFavsResults = createAction("ADD_TO_FAVORITES_RESULTS");
export const removeFromFavsResults = createAction(
  "REMOVE_FROM_FAVORITES_RESULTS"
);

const initialState = [];

export default createReducer(initialState, {
  [setFavoritesResults]: (state, action) => action.payload,
  [addToFavsResults]: (state, action) => {
    //Film already in favoritesResults
    if (
      state.find((favoriteResult) => favoriteResult.id === action.payload.id)
    ) {
      return state;
    }
    //Film added to favoritesResults
    return [...state, action.payload];
  },
  [removeFromFavsResults]: (state, action) => {
    //Film removed from favoritesResults
    return state.filter(
      (favoriteResult) => favoriteResult.id !== action.payload.id
    );
  },
});
