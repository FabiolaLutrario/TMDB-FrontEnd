import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../state/search-results";
import { setFavoritesResults } from "../state/favorites-results";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setFavorites } from "../state/favorites";

function Navbar() {
  const apiKey = "eb7ac5fce53eae88ea5e99a0a131a414";
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function searchFavoritesByIds(favorites) {
    const filmsPromises = favorites.map((favorite) => {
      return axios
        .get(`/api/films/${favorite.media_type}/${favorite.film_id}`)
        .then((response) => response.data)
        .catch((error) => {
          console.error(
            "Error al buscar película o serie por ID:",
            error.message
          );
          return null;
        });
    });
    return Promise.all(filmsPromises);
  }

  const goToHome = (e) => {
    e.preventDefault();
    setSearch("");
    navigate("/");
  };

  const goToFavorites = (e) => {
    e.preventDefault();
    setSearch("");

    const localFavorites = localStorage.getItem("favorites");
    if (localFavorites) {
      const parsedFavorites = JSON.parse(localFavorites);
      dispatch(setFavoritesResults(parsedFavorites));
      navigate("/favorites");
    } else {
      axios
        .get(`/api/favorites/user/${user.id}`)
        .then((res) => {
          dispatch(setFavorites(res.data));
          return searchFavoritesByIds(res.data);
        })
        .then((favoritesResult) => {
          dispatch(setFavoritesResults(favoritesResult));
          localStorage.setItem("favorites", JSON.stringify(favoritesResult));
          navigate("/favorites");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    let results;

    axios
      .get(`/api/films/${search}`)
      .then((response) => {
        results = response.data.results;

        // Realiza una solicitud para cada elemento de película o serie para obtener información de video
        const videoRequests = results.map((film) => {
          if (film.media_type === "movie") {
            return axios.get(`/api/films/movie/${film.id}`);
          } else if (film.media_type === "tv") {
            return axios.get(`/api/films/tv/${film.id}`);
          } else {
            // Si el elemento no es una película ni una serie, regresa una promesa resuelta con null
            return Promise.resolve(null);
          }
        });
        return Promise.all(videoRequests);
      })
      .then((videoResponses) => {
        const combinedResults = results.map((result, index) => {
          if (videoResponses[index]) {
            result.videos = videoResponses[index].data.videos;
          }
          return result;
        });
        dispatch(setSearchResults(combinedResults));
      })
      .then(() => {
        navigate("/search-results");
      })
      .catch((error) => {
        console.error("Error al buscar películas y series:", error);
      });
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();

    axios
      .post(`/api/users/logout`)
      .then(() => {
        localStorage.removeItem("favorites");
        window.location.href = "/";
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" onClick={goToHome}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" onClick={goToFavorites}>
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
