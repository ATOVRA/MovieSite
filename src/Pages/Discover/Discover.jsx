// Styles
import "./Discover.css";
import { useFetch } from "../../Hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { NavLink } from "react-router-dom";
import { genres } from "../../Utils/Genres";

export const Discover = () => {
  const { searchValue, page } = useContext(GlobalContext);
  const [genreId, setGenreId] = useState(null);
  const [filmList, setFilmList] = useState(false);
  
  // Filter Genres Button
  const handleGenres = (e) => {
      if (e.id !== 0) {
        setGenreId(e.id);
        setFilmList(true);
      } else {
        setGenreId(null);
        setFilmList(false);
      }
  };

  // useFetch API
  const {
    data: discover,
    error,
    loader,
  } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=d63c21b2bc442fb1f13183027f8e7523&page=${page}`
  );

  const { data: filterGenres } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=d63c21b2bc442fb1f13183027f8e7523&with_genres=${genreId}`
  );



  return (
    <div className="discover-container">
      <div className="genres-contain">
        <h1 className="genres-contain-title">Filter By Genres</h1>
        <div className="all-genres">
          <ul className="all-genres-ulist">
            {genres &&
              genres.map((item) => {
                return (
                  <li onClick={() => handleGenres(item)} key={item.id}>
                    {item.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="discover-films-contain">
        <h1 className="discover-films-title">Discover Films</h1>
        <div className="discover-films">
          {(!filmList ? discover : filterGenres)?.map((item) => (
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
      </div>
    </div>
  );
};
