import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalFilm.scss";

function ModalFilm({ show, handleClose, film }) {
  console.log(film);
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
        <Button variant="primary" onClick={handleClose}>
          Agregar a favoritos
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalFilm;
