import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalFilm.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToFavs, removeFromFavs } from "../state/favorites";
import {
  addToFavsResults,
  removeFromFavsResults,
  setFavoritesResults,
} from "../state/favorites-results";
import { useLocation } from "react-router";

function ModalFilm({ show, handleClose, film }) {
  const location = useLocation();
  const typeURL = location.pathname.slice(1);
  console.log(typeURL);
  const apiKey = "eb7ac5fce53eae88ea5e99a0a131a414";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favoritesResults = useSelector((state) => state.favoritesResults);
  const [isChangeToFavorites, setIsChangeToFavorites] = useState(false);

  function searchFavoritesByIds(favorites) {
    const filmsPromises = favorites.map((favorite) => {
      return axios
        .get(
          `https://api.themoviedb.org/3/${favorite.media_type}/${favorite.film_id}?api_key=${apiKey}`
        )
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

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");
    if (!localFavorites) {
      axios
        .get(`/api/favorites/user/${user.id}`)
        .then((res) => {
          return searchFavoritesByIds(res.data);
        })
        .then((favoritesResult) => {
          // Actualiza el estado con los favoritos
          dispatch(setFavoritesResults(favoritesResult));

          // Guarda en localStorage
          localStorage.setItem("favorites", JSON.stringify(favoritesResult));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user.id]);

  const addToFavorites = (e) => {
    e.preventDefault();
    const userId = { userId: user.id };
    axios
      .post(
        `/api/favorites/addToFavorites/${film.id}/${film.media_type}`,
        userId
      )
      .then(() => {
        dispatch(addToFavs(film));
        setIsChangeToFavorites(true);
        setTimeout(() => {
          setIsChangeToFavorites(false);
        }, 1000);
        alert("Añadido a favoritos");
      })
      .then(() => {
        // Actualiza el estado de favoritesResults
        dispatch(addToFavsResults(film));

        // Obtiene los favoritos del estado y los guarda en localStorage
        const updatedFavorites = [...favoritesResults, film];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      })
      .catch((error) => console.error(error));
  };

  const removeFromFavorites = (e) => {
    e.preventDefault();
    const userId = { userId: user.id };
    axios
      .delete(`/api/favorites/${film.id}`)
      .then(() => {
        dispatch(removeFromFavs(film));
        setIsChangeToFavorites(true);
        setTimeout(() => {
          setIsChangeToFavorites(false);
        }, 1000);
        alert("Eliminado de favoritos");
        handleClose();
      })
      .then(() => {
        // Actualiza el estado de favoritesResults
        dispatch(removeFromFavsResults(film));

        // Obtiene los favoritos del estado y actualiza localStorage sin el elemento eliminado
        const updatedFavorites = favoritesResults.filter(
          (favorite) => favorite.id !== film.id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {film.title ? film.title : film.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          className="imgStyle"
          src={
            film.poster_path
              ? "https://image.tmdb.org/t/p/w500" + film.poster_path
              : "https://menteylente.files.wordpress.com/2016/04/film.jpg"
          }
          alt="Imagen del Film"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={
            typeURL === "favorites" ? removeFromFavorites : addToFavorites
          }
          disabled={isChangeToFavorites}
        >
          {typeURL === "favorites"
            ? "Eliminar de favoritos"
            : "Agregar a favoritos"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalFilm;
