function MovieCard({ movie }) {
  return (
    <ul>
      <li>
        {movie.title} {movie.poster_path}
      </li>
    </ul>
  );
}

export default MovieCard;
