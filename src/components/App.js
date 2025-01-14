import { useEffect, useState } from "react";

import { NavBar } from "./Navbar/NavBar";
import { Logo } from "./Navbar/Logo";
import { NumResults } from "./Navbar/NumResults";
import { Search } from "./Navbar/Search";
import { Main } from "./Main/Main";
import { Loader } from "./UI/Loader";
import { ErrorMessage } from "./UI/ErrorMessage";
import { MovieList } from "./Main/MovieList/MovieList";
import { Box } from "./Main/Box";
import { MovieDetails } from "./Main/MovieList/MovieDetails";
import { WatchedSummary } from "./Main/Watched/WatchedSummary";
import { WatchedMoviesList } from "./Main/Watched/WatchedMoviesList";
import useMovies from "../hooks/useMovies";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function App() {
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
    toast.success("Movie added to watched list");
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    toast.success("Movie removed");
  }

  const { movies, isLoading, error, queryLength } = useMovies(query);

  useEffect(() => {
    function handleResize() {
      const box = document.querySelector(".box");
      if (window.innerWidth < 700) {
        if (queryLength < 3) {
          box.style.height = "auto";
        } else {
          box.style.height = "100%";
        }
      } else {
        box.style.height = "";
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [queryLength]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
        style={{ fontSize: "1.8rem" }}
        className="custom-toast-container"
      />
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatch={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
