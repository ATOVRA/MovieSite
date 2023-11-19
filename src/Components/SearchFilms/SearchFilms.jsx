// Styles
import "../../Pages/Home/Home.css";
import "../../App.css";

// Packages
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Context
import { GlobalContext } from "../../Context/GlobalContext";

// Hooks
import { useFetch } from "../../Hooks/useFetch";

export const SearchFilms = ({ NextPage, PrevPage }) => {
  const { setSearch, searchValue, setSearchValue, page } = useContext(GlobalContext);

  const {
    data: searchResults,
    loader,
    error,
  } = useFetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=d63c21b2bc442fb1f13183027f8e7523&page=${page}`
  );
  
  useEffect(() => {

      return () => {
        setSearch("")
        setSearchValue("")
      }
  }, [])
  
  return (
    <div className="home-container">
      {loader && <h1 className="Loader-text">Loading...</h1>}
      {error && <h1 className="Error-text">{error}</h1>}
      {!error && searchResults && (
        <div className="home-page-pointer">Page: {page}</div>
      )}
      <div className="home-movie-contain">
        {searchResults &&
          searchResults.map((item) => (
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

      {searchResults && (
        <div className="change-page-contain">
          <button onClick={(e) => PrevPage(e)}>Prev</button>
          <button onClick={NextPage}>Next</button>
        </div>
      )}
    </div>
  );
};
