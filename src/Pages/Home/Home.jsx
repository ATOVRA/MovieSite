// Styles
import "./Home.css";

// Hooks
import { useFetch } from "../../Hooks/useFetch";
import { useContext } from "react";

// Packages
import { NavLink } from "react-router-dom";

// Context
import { GlobalContext } from "../../Context/GlobalContext";

import { SearchFilms } from "../../Components/SearchFilms/SearchFilms";

export const Home = () => {
  const { searchValue, page, setPage } = useContext(GlobalContext);

  // useFetch API
  const {
    data: discover,
    error,
    loader,
  } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=d63c21b2bc442fb1f13183027f8e7523&page=${page}`
  );

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

  // Scroll Lock At Loader
  if (loader) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      {searchValue ? (
        <SearchFilms NextPage={NextPage} PrevPage={PrevPage} />
        ) : (
          <div className="home-container">
            {loader && <h1 className="Loader-text">Loading...</h1>}
            {error && <h1 className="Error-text">{error}</h1>}
            {!error && discover && (
              <div className="home-page-pointer">Page: {page}</div>
            )}
            <div className="home-movie-contain">
              {discover &&
                discover.map((item) => (
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
        )}
      
    </>
  );
};
