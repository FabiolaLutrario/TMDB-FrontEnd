import React, { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../state/search-results";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHome = (e) => {
    e.preventDefault();
    setSearch("");
    navigate("/");
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();

    axios
      .post(`/api/users/logout`)
      .then(() => {
        window.location.href = "/";
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
        dispatch(setSearchResults(response.data.results));
      })
      .then(() => {
        navigate("/search-results");
      })
      .catch((error) => {
        console.error("Error al buscar películas y series:", error);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" onClick={goToHome}>
                  Inicio
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" onClick={goToHome}>
                  Mis Favoritos
                </Link>
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
