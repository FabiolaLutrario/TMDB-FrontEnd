import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../commons/Card";
import { useSelector } from "react-redux";
import "./Grid.scss";
import ModalFilm from "../commons/ModalFilm";

const Grid = () => {
  const searchResults = useSelector((state) => state.searchResults);
  const [film, setFilm] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (film) => {
    setFilm(film);
    setShow(true);
  };

  return (
    <>
      <div className="alert alert-light alert-another-styles" role="alert">
        Resultados de la búsqueda:
      </div>
      {searchResults.length ? (
        <div className="card-group row row-cols-1 row-cols-md-4 g-4 card-group-another-styles">
          {searchResults.map((film, i) =>
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
