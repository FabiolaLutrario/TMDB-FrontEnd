import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import searchResultsReducer from "./search-results";

const store = configureStore({
  reducer: {
    user: userReducer,
    searchResults: searchResultsReducer,
  },
});

export default store;
