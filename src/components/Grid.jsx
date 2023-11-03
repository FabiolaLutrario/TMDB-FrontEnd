import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../commons/Card";
import { useDispatch, useSelector } from "react-redux";
import "./Grid.scss";
import ModalFilm from "../commons/ModalFilm";
import { setFavoritesResults } from "../state/favorites-results";

const Grid = () => {
  const location = useLocation();
  const typeURL = location.pathname.slice(1);
  let films = [];
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const favoritesResults = useSelector((state) => state.favoritesResults);
  const [film, setFilm] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (film) => {
    setFilm(film);
    setShow(true);
  };

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");
    if (localFavorites) {
      const parsedFavorites = JSON.parse(localFavorites);
      dispatch(setFavoritesResults(parsedFavorites));
    }
  }, []);

  if (typeURL === "search-results") {
    films = searchResults;
  } else if (typeURL === "favorites") {
    films = favoritesResults;
  }

  /*   const updateFavorites = (newFavorites) => {
    dispatch(setFavorites(newFavorites));
    // Guardar en localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };
  
  // Al cargar la página, verifica si hay favoritos en localStorage y configura el estado de Redux
  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");
    if (localFavorites) {
      const parsedFavorites = JSON.parse(localFavorites);
      dispatch(setFavorites(parsedFavorites));
    }
  }, []); */

  return (
    <>
      {typeURL === "search-results" ? (
        <div className="alert alert-light alert-another-styles" role="alert">
          Resultados de la búsqueda:
        </div>
      ) : (
        <div className="alert alert-light alert-another-styles" role="alert">
          Favoritos:
        </div>
      )}
      {films.length ? (
        <div className="card-group row row-cols-1 row-cols-md-4 g-4 card-group-another-styles">
          {films.map((film, i) =>
            film.poster_path ? (
              <div
                className="col hover"
                key={i}
                onClick={() => handleShow(film)}
              >
                <Card film={film} />
              </div>
            ) : null
          )}
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          No se encontraron resultados.
        </div>
      )}
      <ModalFilm show={show} handleClose={handleClose} film={film} />
    </>
  );
};

export default Grid;
