const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src={
              data.images[0]
                ? data.images[0].url
                : "https://i.imgur.com/M1wbKOT.jpg"
            }
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <div className="media-content">
              <p className="title is-6">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
