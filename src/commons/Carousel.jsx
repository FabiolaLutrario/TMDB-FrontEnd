import React, { useEffect, useRef } from "react";

function Carousel({ elements, title, id }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    // Programar el cambio automático de las diapositivas cada 3 segundos
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextButton = carouselRef.current.querySelector(
          "[data-bs-slide='next']"
        );
        if (nextButton) {
          nextButton.click();
        }
      }
    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <h2
          style={{
            color: "#fff",
            backgroundColor: "#000000",
            marginTop: "10px",
            marginBottom: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
            display: "inline-block",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          {title}
        </h2>
      </div>
      <div className="container-sm">
        <div
          ref={carouselRef}
          id={`carouselExampleCaptions-${id}`}
          className="carousel slide another-styles"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {elements.map((element, index) => (
              <button
                key={index}
                type="button"
                data-bs-target={`#carouselExampleCaptions-${id}`}
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {elements.map((element, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="container" style={{ marginTop: "10px" }}>
                  <img
                    className="img-styles container-sm"
                    src={
                      element.poster_path
                        ? "https://image.tmdb.org/t/p/w500" +
                          element.poster_path
                        : "https://image.tmdb.org/t/p/w500" +
                            element.profile_path ||
                          "https://igualati.org/wp-content/uploads/2023/03/pelicula-rodar-FB.jpg"
                    }
                    alt="Imagen del Film o Actor"
                  />
                  <p>{element.title ? element.title : element.name}</p>
                </div>
                <div className="carousel-caption d-none d-md-block"></div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carouselExampleCaptions-${id}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carouselExampleCaptions-${id}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Carousel;
