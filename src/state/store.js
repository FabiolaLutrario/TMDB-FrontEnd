import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import searchResultsReducer from "./search-results";
import favoritesResultsReducer from "./favorites-results";
import favoritesReducer from "./favorites";
import trendingReducer from "./trending";
import upcomingReducer from "./upcoming";
import actorsTrendingReducer from "./actors-trending";

const store = configureStore({
  reducer: {
    user: userReducer,
    searchResults: searchResultsReducer,
    favoritesResults: favoritesResultsReducer,
    favorites: favoritesReducer,
    trending: trendingReducer,
    upcoming: upcomingReducer,
    actorsTrending: actorsTrendingReducer,
  },
});

export default store;
