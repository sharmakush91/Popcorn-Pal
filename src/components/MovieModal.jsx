import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MovieModal.module.css";

const token = import.meta.env.VITE_TMDB_V4_API_TOKEN;

function MovieModal() {
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
        const res1 = await fetch(
          `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
          options
        );
        const data = await res1.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [id, media_type]);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scroll

    return () => {
      document.body.style.overflow = "auto"; // enable scroll on cleanup/unmount
    };
  }, []);

  if (!movie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      className={styles.modalOverlay}
      style={{ "--backdrop-image": `url(${backdropUrl})` }}
    >
      <div className={styles.modalBox}>
        <button className={styles.modalButton} onClick={handleClose}>
          X
        </button>
        <div className={styles.modalText}>
          <h1>{movie.title || movie.name}</h1>
          <h3>Release date: {movie.release_date}</h3>
          <h3>Runtime: {movie.runtime} Minutes</h3>
          <h3>Language: {movie.original_language.toUpperCase()}</h3>
          <p>{movie.overview}</p>
          {console.log(movie)}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
