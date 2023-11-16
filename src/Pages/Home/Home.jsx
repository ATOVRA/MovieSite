// Styles
import "./Home.css";

// Hooks
import { useFetch } from "../../Hooks/useFetch";
import { useContext, useEffect, useState } from "react";

// Packages
import { NavLink } from "react-router-dom";

// Context
import { GlobalContext } from "../../Context/GlobalContext";

export const Home = () => {
  const { searchValue, page, setPage } = useContext(GlobalContext);

  // useFetch Api
  const {
    data: discover,
    error,
    loader,
  } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=d63c21b2bc442fb1f13183027f8e7523&page=${page}`
  );

  const { data: searchResults } = useFetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=d63c21b2bc442fb1f13183027f8e7523&page=${page}`
  );

  const resultsToMap =
    searchResults && searchResults.length > 0 ? searchResults : discover;

  // Next & Prev Page Controller
  const PrevPage = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0 });
    }
  };

  const NextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0 });
  };

  // Scroll Lock In Loader
  if (loader) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="home-container">
      {loader && <h1 className="Loader-text">Loading...</h1>}
      {error && <h1 className="Error-text">{error}</h1>}
      {!error && (searchResults || discover) && (
        <div className="home-page-pointer">Page: {page}</div>
      )}
      <div className="home-movie-contain">
        {resultsToMap?.map((item) => (
          <div className="movie-card" key={item.id}>
            <NavLink to={`/filmDetail/id/${item.id}`}>
              <div className="card-image-div">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  className="mc-image"
                  alt="#"
                />
              </div>
            </NavLink>
            <div className="mc-info-contain">
              <h2 className="mc-card-heading">
                <NavLink to={`/filmDetail/id/${item.id}`}>
                  {item.title.length >= 40
                    ? item.title.substring(0, 40) + "..."
                    : item.title}
                </NavLink>
              </h2>
              <p className="mc-card-release-date">{item.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      {discover && (
        <div className="change-page-contain">
          <button onClick={(e) => PrevPage(e)}>Prev</button>
          <button onClick={NextPage}>Next</button>
        </div>
      )}
    </div>
  );
};
