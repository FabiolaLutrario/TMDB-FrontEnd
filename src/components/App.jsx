import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
);

export default App;
