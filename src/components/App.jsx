import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/user";
import axios from "axios";
import Navbar from "./Navbar";
import "./App.scss";
import Grid from "./Grid";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/users/me`)
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((error) => console.error(error));
  }, []);

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

  const handleRegisterClick = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      axios
        .post(`/api/users/register`, formData)
        .then(() => {
          alert("Usuario Registrado");
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {user.id ? (
        <>
          <Navbar />
          <div>
            {/*           <img
              src="./assets/will-smith-presenta.png"
              alt="Will Smith presentando"
            /> */}
          </div>
        </>
      ) : (
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
            {activeTab === "login" ? (
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
                  <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLoginClick}
                >
                  Ingresar
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterClick}>
                <div className="mb-3">
                  <label htmlFor="exampleInputName1" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="form-control"
                    id="exampleInputName"
                    aria-describedby="name"
                    value={formData.name}
                    name="name"
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputLast_name1"
                    className="form-label"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    placeholder="Apellido"
                    className="form-control"
                    id="exampleInputLast_name"
                    aria-describedby="last_name"
                    value={formData.last_name}
                    name="last_name"
                    onChange={handleInputChange}
                  ></input>
                </div>
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
                    required
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
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputConfirmPassword1"
                    className="form-label"
                  >
                    Repetir contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Repetir contraseña"
                    className="form-control"
                    id="exampleInputConfirmPassword1"
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>
                {passwordMatchError && (
                  <div className="error-message">
                    Las contraseñas no coinciden.
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleRegisterClick}
                >
                  Aceptar
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" />
        <Route path="/search-results" element={<Grid />} />
      </Routes>
    </>
  );
};

export default App;
