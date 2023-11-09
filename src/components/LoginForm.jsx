import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setUser } from "../state/user";

function LoginForm() {
  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      })
      .catch((error) => console.error(error));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "signup") {
      navigate("/signup");
    }
  };

  return (
    <div className="container-parent">
      <div className="container">
        <ul className="tab-group">
          <li className={`tab ${activeTab === "login" ? "active" : ""}`}>
            <p onClick={() => handleTabChange("login")}>Iniciar Sesión</p>
          </li>
          <li className={`tab ${activeTab === "signup" ? "active" : ""}`}>
            <p onClick={() => handleTabChange("signup")}>Registrarse</p>
          </li>
        </ul>
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
          <div className="margin-bottom">
            <Link
              to="/restore-password"
              className="nav-link active"
              style={{ textDecoration: "underline" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <button type="submit" className="btn btn-danger">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
