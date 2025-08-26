import "./App.css";
import { useState } from "react";

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
      </form>
    </div>
  );
}

export default App;
