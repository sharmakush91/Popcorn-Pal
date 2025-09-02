import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import MovieModal from "./components/MovieModal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:media_type/:id" element={<MovieModal />} />
    </Routes>
  );
}

export default App;
