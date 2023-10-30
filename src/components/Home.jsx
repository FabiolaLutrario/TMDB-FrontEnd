import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="background-image">
      <div class="container">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Correo
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            ></input>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Contraseña
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
          <button type="submit" class="btn btn-primary">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
