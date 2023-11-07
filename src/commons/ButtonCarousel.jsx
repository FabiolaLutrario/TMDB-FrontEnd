import React from "react";

function ButtonCarousel({ index }) {
  return (
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to={index}
      className={index === 0 ? "active" : ""}
      aria-current={index === 0 ? "true" : undefined}
      aria-label={`Slide ${index + 1}`}
    ></button>
  );
}

export default ButtonCarousel;
