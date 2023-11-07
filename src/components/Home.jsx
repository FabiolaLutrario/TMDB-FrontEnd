import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrending } from "../state/trending";
import { setUpcoming } from "../state/upcoming";
import { setActorsTrending } from "../state/actors-trending";
import axios from "axios";
import "./Home.scss";
import Carousel from "../commons/Carousel";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const trending = useSelector((state) => state.trending);
  const upcoming = useSelector((state) => state.upcoming);
  const actorsTrending = useSelector((state) => state.actorsTrending);

  useEffect(() => {
    const sessionTrending = sessionStorage.getItem("trending");
    if (sessionTrending) {
      const parsedTrending = JSON.parse(sessionTrending);
      dispatch(setTrending(parsedTrending));
    } else {
      axios
        .get(`/api/films/trending/all/day`)
        .then((res) => {
          dispatch(setTrending(res.data.results));
          sessionStorage.setItem("trending", JSON.stringify(res.data.results));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const sessionUpcoming = sessionStorage.getItem("upcoming");
    if (sessionUpcoming) {
      const parsedUpcoming = JSON.parse(sessionUpcoming);
      dispatch(setUpcoming(parsedUpcoming));
    } else {
      axios
        .get(`/api/films/movie/upcoming`)
        .then((res) => {
          dispatch(setUpcoming(res.data.results));
          sessionStorage.setItem("upcoming", JSON.stringify(res.data.results));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const sessionActorsTrending = sessionStorage.getItem("actorsTrending");
    if (sessionActorsTrending) {
      const parsedActorsTrending = JSON.parse(sessionActorsTrending);
      dispatch(setActorsTrending(parsedActorsTrending));
    } else {
      axios
        .get(`/api/films/trending/person/day`)
        .then((res) => {
          dispatch(setActorsTrending(res.data.results));
          sessionStorage.setItem(
            "actorsTrending",
            JSON.stringify(res.data.results)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch]);

  return user.id ? (
    <>
      <Carousel
        elements={trending}
        title="Series y Películas Populares:"
        id="trending-carousel"
      />
      <Carousel
        elements={upcoming}
        title="Próximos Estrenos:"
        id="upcoming-carousel"
      />
      <Carousel
        elements={actorsTrending}
        title="Actores Populares:"
        id="actorsTrending-carousel"
      />
    </>
  ) : null;
}

export default Home;
