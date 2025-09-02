import MovieCard from "./MovieCard";
import { useState } from "react";
import styles from "./HomePage.module.css";
import logo from "../Images/logo.png";
import MovieModal from "./MovieModal";

const token = import.meta.env.VITE_TMDB_V4_API_TOKEN;

function HomePage() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);

  async function fetchPages(page) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query}&page=${page}`,
        options
      );
      const data = await res.json();

      if (page === 1) {
        setMovie(data.results || []);
      } else {
        setMovie((prev) => [...prev, ...data.results]);
      }

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchPages(page);
    setSelectedMovie(null);
  }

  function modalOnClose() {
    setSelectedMovie(null);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.button}>
        <img src={logo} alt="Popcorn Pal 🍿" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Movies..."
        ></input>
        <button type="submit">Search</button>
        <div className={styles.appContainer}>
          {movie
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => {
                  setSelectedMovie(movie);
                  console.log(selectedMovie);
                }}
              />
            ))}
          <MovieModal movie={selectedMovie} onClose={modalOnClose} />
        </div>
        <button onClick={() => setPage(page + 1)}>Load More</button>
      </form>
    </div>
  );
}

export default HomePage;
