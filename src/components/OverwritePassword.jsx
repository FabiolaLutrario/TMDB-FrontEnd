import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function OverwritePassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [tokenIsValid, setTokenIsvalid] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/users/token-restore-password/${token}`)
      .then(() => {
        setTokenIsvalid(true);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    setPasswordMatchError(false);
    const { name } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  };

  const handleOverwriteClick = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      axios
        .post(`/api/users/overwrite-password/${token}`, {
          password: formData.password,
        })
        .then(() => {
          alert("Contraseña cambiada con éxito");
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleGoToBackClick = () => {
    navigate("/");
  };

  return tokenIsValid ? (
    <div className="container-parent">
      <div className="container">
        <div className="mb-3">
          <label className="form-label">Cambio de contraseña:</label>
        </div>

        <form onSubmit={handleOverwriteClick}>
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
            <div className="error-message" style={{ color: "red" }}>
              Las contraseñas no coinciden.
            </div>
          )}

          <div class="modal-footer" style={{ marginTop: "30px" }}>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleOverwriteClick}
            >
              Enviar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleGoToBackClick}
              style={{ marginLeft: "20px" }}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div
      className="alert alert-danger"
      role="alert"
      style={{ marginTop: "30px" }}
    >
      ¡Token inválido!
    </div>
  );
}

export default OverwritePassword;
