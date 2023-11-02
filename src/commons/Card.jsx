const Card = ({ film }) => {
  return (
    <div className="card">
      <div className="container-fluid">
        <img
          className="card-img-top"
          src={"https://image.tmdb.org/t/p/w500" + film.poster_path}
          alt="Imagen del Film"
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{film.title ? film.title : film.name}</h5>
      </div>
    </div>
  );
};

export default Card;
