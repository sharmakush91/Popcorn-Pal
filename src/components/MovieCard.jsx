import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  const navigate = useNavigate();

  function navOnClick() {
    navigate(`/${movie.media_type}/${movie.id}`, {});
  }

  return (
    <div className={styles.card} onClick={navOnClick}>
      <img src={imageUrl} alt={movie.title} className={styles.cardImage} />
      <div className={styles.overlay}>
        <h3>{movie.title || movie.name}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
