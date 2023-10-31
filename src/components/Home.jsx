import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Home.scss";
import { setUser } from "../state/user";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();

    axios
      .post(`/api/users/login`, formData)
      .then((res) => {
        dispatch(setUser(res.data));
        alert("Bienvenido!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="background-image">
      <div className="container">
        <form onSubmit={handleLoginClick}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Correo
            </label>
            <input
              type="email"
              placeholder="Dirección de correo electrónico"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="form-control"
              id="exampleInputPassword1"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
            ></input>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLoginClick}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
