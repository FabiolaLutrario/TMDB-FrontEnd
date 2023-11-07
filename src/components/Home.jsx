import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrendingTv } from "../state/trending-tv";
import axios from "axios";
import "./Home.scss";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const trendingTv = useSelector((state) => state.trendingTv);
  const carouselRef = useRef(null);

  useEffect(() => {
    const localTrendingTv = localStorage.getItem("trendingTv");
    if (localTrendingTv) {
      const parsedTrendingTv = JSON.parse(localTrendingTv);
      dispatch(setTrendingTv(parsedTrendingTv));
    } else {
      axios
        .get(`/api/films/trending/all/day`)
        .then((res) => {
          dispatch(setTrendingTv(res.data.results));
          localStorage.setItem("trendingTv", JSON.stringify(res.data.results));
        })
        .catch((error) => {
          console.error(error);
        });
    }

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
  }, [dispatch]);

  return user.id ? (
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
          }}
        >
          Series y Películas más Populares:
        </h2>
      </div>
      <div className="container-sm">
        <div
          ref={carouselRef}
          id="carouselExampleCaptions"
          className="carousel slide another-styles"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {trendingTv.map((film, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {trendingTv.map((film, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="container" style={{ marginTop: "10px" }}>
                  <img
                    className="img-styles container-sm"
                    src={
                      "https://image.tmdb.org/t/p/w500" + film.poster_path ||
                      "https://igualati.org/wp-content/uploads/2023/03/pelicula-rodar-FB.jpg"
                    }
                    alt="Imagen del Film"
                  />
                </div>
                <div className="carousel-caption d-none d-md-block"></div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
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
            data-bs-target="#carouselExampleCaptions"
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
  ) : null;
}

export default Home;
