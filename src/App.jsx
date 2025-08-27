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

function App() {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
