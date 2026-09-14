import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import styles from "./HomePage.module.css";
import logo from "../Images/logo.png";

// ✅ Use V3 key here
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

function HomePage() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchPages(page) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&query=${query}&page=${page}&api_key=${apiKey}`,
      );

      const data = await res.json();

      if (page === 1) {
        setMovie(data.results || []);
      } else {
        setMovie((prev) => [...prev, ...data.results]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchPages(page);
  }

  const navigate = useNavigate();
  function returnHome() {
    setMovie([]);
    setQuery("");
    setPage(1);
    navigate("/");
  }

  return (
    <div>
      <button className={styles.homeButton} onClick={returnHome}>
        Home
      </button>

      <form onSubmit={handleSubmit} className={styles.button}>
        <img src={logo} alt="Popcorn Pal 🍿" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your favourite Movies/TV series..."
        />

        <button type="submit">Search</button>

        <div className={styles.appContainer}>
          {movie
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <MovieCard
                key={`${movie.media_type}-${movie.id}`}
                movie={movie}
              />
            ))}
        </div>

        {movie.length > 1 && (
          <button onClick={() => setPage(page + 1)}>Load More</button>
        )}
      </form>

      <Outlet />
    </div>
  );
}

export default HomePage;
