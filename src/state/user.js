import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");
export const addToFavs = createAction("ADD_TO_FAVORITES");
export const removeFromFavs = createAction("REMOVE_FROM_FAVORITES");

const initialState = {
  id: null,
  name: null,
  lastName: null,
  email: null,
  favorites: [],
};

export default createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
  [addToFavs]: (state, action) => {
    //To add a favorite need to be logged in
    if (!state.id) {
      return state;
    }
    //Film already in favorites
    if (state.favorites.find((favorite) => favorite.id === action.payload.id)) {
      return state;
    }

    //Film added to favorites
    return { ...state, favorites: [...state.favorites, action.payload] };
  },
  [removeFromFavs]: (state, action) => {
    //Film removed from favorites
    return {
      ...state,
      favorites: state.favorites.filter(
        (favorite) => favorite.id !== action.payload.id
      ),
    };
  },
});
