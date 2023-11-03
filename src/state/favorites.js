import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavorites = createAction("SET_FAVORITES");

export const addToFavs = createAction("ADD_TO_FAVORITES");
export const removeFromFavs = createAction("REMOVE_FROM_FAVORITES");

const initialState = [];

export default createReducer(initialState, {
  [setFavorites]: (state, action) => action.payload,
  [addToFavs]: (state, action) => {
    //Film already in favorites
    if (state.find((favorite) => favorite.id === action.payload.id)) {
      return state;
    }
    //Film added to favorites
    return [...state, action.payload];
  },
  [removeFromFavs]: (state, action) => {
    //Film removed from favorites
    return state.filter((favorite) => favorite.id !== action.payload.id);
  },
});
