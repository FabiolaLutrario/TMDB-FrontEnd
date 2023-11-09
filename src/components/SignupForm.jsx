import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("signup");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
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
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "login") {
      navigate("/");
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
            <label htmlFor="exampleInputLast_name1" className="form-label">
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
            <div className="error-message">Las contraseñas no coinciden.</div>
          )}
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleRegisterClick}
          >
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
