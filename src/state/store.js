import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import searchResultsReducer from "./search-results";
import favoritesResultsReducer from "./favorites-results";
import favoritesReducer from "./favorites";

const store = configureStore({
  reducer: {
    user: userReducer,
    searchResults: searchResultsReducer,
    favoritesResults: favoritesResultsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
