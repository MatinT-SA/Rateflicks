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

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const API_KEY = "f2603839";

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
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  const { movies, isLoading, error } = useMovies(query);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        )}
        {error && <ErrorMessage message={error} />}
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
