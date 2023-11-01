import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router";

function Navbar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();

    axios
      .post(`/api/users/logout`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    const apiKey = "eb7ac5fce53eae88ea5e99a0a131a414";

    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${search}`
      )
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error("Error al buscar películas y series:", error);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Inicio
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Mis Favoritos
                </a>
              </li>
              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Buscar películas o series"
                    aria-label="Search"
                    value={search}
                    onChange={handleChangeSearch}
                  ></input>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleSearchClick}
                  >
                    <BsSearch />
                  </button>
                </form>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogoutClick}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
