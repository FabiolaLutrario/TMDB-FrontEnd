import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/user";
import axios from "axios";
import Navbar from "./Navbar";
import "./App.scss";
import Grid from "./Grid";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import RestorePassword from "./RestorePassword";
import OverwritePassword from "./OverwritePassword";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/users/me`)
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  return (
    <>
      {user.id ? (
        <>
          <Navbar />
          <div></div>
        </>
      ) : (
        <Routes>
          <Route path="signup" element={<SignupForm />} />
          <Route path="restore-password" element={<RestorePassword />} />
        </Routes>
      )}

      <Routes>
        <Route path="/" element={user.id ? <Home /> : <LoginForm />} />
        <Route
          path="favorites"
          element={user.id ? <Grid type="favorites" /> : <Navigate to="/" />}
        />
        <Route
          path="search-results"
          element={
            user.id ? <Grid type="search-results" /> : <Navigate to="/" />
          }
        />
        <Route
          path="overwrite-password/:token"
          element={!user.id ? <OverwritePassword /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
