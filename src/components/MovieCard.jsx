import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={movie.title} className={styles.cardImage} />
      <div className={styles.overlay}>
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
