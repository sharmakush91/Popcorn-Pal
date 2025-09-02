import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MovieModal.module.css";

const token = import.meta.env.VITE_TMDB_V4_API_TOKEN;

function MovieModal({ onClose }) {
  const { id, media_type } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !media_type) return;

    const fetchDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
          options
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [id, media_type]);

  if (!movie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

  const handleClose = () => {
    onClose();
    navigate(-1); // Go back in history when modal closes
  };

  return (
    <div
      className={styles.modalOverlay}
      style={{ "--backdrop-image": `url(${backdropUrl})` }}
    >
      <button className={styles.modalButton} onClick={handleClose}>
        X
      </button>
      <div className={styles.modalBox}>
        <h1>{movie.title || movie.name}</h1>
        <h3>Rating: {movie.vote_average}</h3>
        <h3>Language: {movie.original_language}</h3>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieModal;
