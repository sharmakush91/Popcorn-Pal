import "./App.css";
import MovieCard from "./components/MovieCard";
import { useState } from "react";

const dummyMovies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    poster_path:
      "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    vote_average: 8.4,
    release_date: "2019-04-24",
  },
  {
    id: 2,
    title: "Inception",
    poster_path:
      "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    vote_average: 8.8,
    release_date: "2010-07-16",
  },
];
const token = import.meta.env.VITE_TMDB_V4_API_TOKEN;

function App() {
  const [query, setQuery] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("Token:", token);
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/1175942?language=en-US",
        options
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Popcorn Pal 🍿</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Movies..."
        ></input>
        <button type="submit">Search..</button>
        <div>
          {dummyMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </form>
    </div>
  );
}

export default App;
