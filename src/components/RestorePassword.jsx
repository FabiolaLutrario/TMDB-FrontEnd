import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function RestorePassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendClick = (e) => {
    e.preventDefault();

    axios
      .put(`/api/users/restore-password`, { email: email })
      /*       Aca poner un spinner para que mientras la promesa esté pending se
      muestre el spinner; y cuando la promesa esté resolve o reject se oculte */
      .then(() => {
        alert("Correo enviado! Revisa tu correo electrónico");
        navigate("/");
      })
      .catch((error) => {
        var divInvalidEmail = document.getElementById("invalidEmail");
        divInvalidEmail.style.display = "block";
        console.error(error);
      });
  };

  const handleGoToBackClick = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    var divInvalidEmail = document.getElementById("invalidEmail");
    divInvalidEmail.style.display = "none";
    setEmail(e.target.value);
  };

  return (
    <div className="container-parent">
      <div className="container">
        <div className="mb-3">
          <label className="form-label">
            Ingresa tu correo y te enviaremos los pasos para sobrescribir tu
            contraseña.
          </label>
        </div>

        <form onSubmit={handleSendClick}>
          <div class="input-group has-validation">
            <div class="form-floating is-invalid">
              <input
                type="email"
                placeholder="Dirección de correo electrónico"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                name="email"
                onChange={handleInputChange}
                style={{ borderWidth: "3px" }}
              ></input>
            </div>

            <div
              id="invalidEmail"
              class="invalid-feedback"
              style={{ display: "none" }}
            >
              Dirección de correo inválida.
            </div>
          </div>

          <div class="modal-footer" style={{ marginTop: "30px" }}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleSendClick}
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
  );
}

export default RestorePassword;
