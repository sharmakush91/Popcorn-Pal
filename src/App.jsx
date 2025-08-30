import MovieCard from "./components/MovieCard";
import { useState } from "react";
import styles from "./App.module.css";
import logo from "./Images/logo.png";
const token = import.meta.env.VITE_TMDB_V4_API_TOKEN;

function App() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
        options
      );
      const data = await res.json();
      setMovie(data.results || []);

      console.log(data);
    } catch (err) {
      console.error(err);
    }
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
          {movie.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </form>
    </div>
  );
}

export default App;
