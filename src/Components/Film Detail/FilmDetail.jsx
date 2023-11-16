// Styles
import "./FilmDetail.css";
import { FaPlay, FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";

// Hooks
import { useFetch } from "../../Hooks/useFetch";
import { useContext, useEffect, useState } from "react";

// Packages
import { NavLink, useParams } from "react-router-dom";
import ApexChart from "../ApexChart/ApexChart";

// Context
import { GlobalContext } from "../../Context/GlobalContext";

export const FilmDetail = () => {
  const { id } = useParams();
  const { setSeires } = useContext(GlobalContext);
  const [trailerModal, setTrailerModal] = useState(false);

  const handleModal = () => {
    setTrailerModal(!trailerModal);
  };

  // Film Trailer Videos
  const { data: videos } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d63c21b2bc442fb1f13183027f8e7523`
  );

  const TrailerVideo = () => {
    if (videos && videos.length > 0) {
      return videos[0].key;
    }
  };

  // Film Detail Api
  const {
    data: detailes,
    error,
    loader,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d63c21b2bc442fb1f13183027f8e7523`
  );

  //  Film Runtime Formate
  const filmRuntime = () => {
    if (detailes !== null) {
      const filmRuntime = detailes.runtime;

      const hours = Math.floor(filmRuntime / 60);
      const minutes = filmRuntime % 60;

      return `${hours}h ${minutes}m`;
    }
  };

  // Sent Film Advantage Score To Chart
  useEffect(() => {
    let isMounted = true;

    if (detailes !== null && isMounted) {
      const percentage = (detailes.vote_average / 10) * 100;
      setSeires(Math.floor(percentage));
    }
    return () => {
      isMounted = false;
    };
  }, [detailes]);

  useEffect(() => {
    return () => {
      setSeires(0);
    };
  }, []);

  return (
    <div className="film-detail-contain">
      {loader && <h1 className="Loader-text">Loading...</h1>}
      {error && <h1 className="Error-text">{error}</h1>}
      {trailerModal && detailes && (
        <div
          className="trailer-modal"
          style={trailerModal ? { display: "flex" } : { display: "none" }}
        >
          <GiCancel
            className="trailer-modal-cancel"
            onClick={() => {
              trailerModal && setTrailerModal(false);
            }}
          />
          <div className="trailer-modal-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${TrailerVideo()}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      {detailes !== null && (
        <div className="film-detailes" key={detailes.id}>
          <div
            className="film-poster"
            style={{
              background: `url(https://image.tmdb.org/t/p/w500${detailes.backdrop_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backdropFilter: "blur(20px)",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${detailes.poster_path}`}
              alt="#"
              className="film-wp-image"
            />
          </div>
          <div className="film-info-contain">
            <p className="film-title-date">
              {detailes.title}{" "}
              <span>({detailes.release_date.substring(0, 4)})</span>
            </p>
            <div className="film-facts">
              <p className="film-release">
                {detailes.production_countries.length > 0
                  ? `${detailes.release_date} (${detailes.production_countries[0].iso_3166_1})`
                  : `${detailes.release_date}`}
              </p>
              <p className="film-genres">
                {detailes.genres.map(
                  (item, index, array) =>
                    `${item.name}${index !== array.length - 1 ? ", " : ""}`
                )}
              </p>
              <p className="film-runtimes">{filmRuntime()}</p>
            </div>
            <div className="film-actions">
              <div className="film-score-chart-div">
                <div className="film-score-chart">
                  <ApexChart />
                </div>
                <p className="user-score-title">
                  User <br /> Score
                </p>
              </div>
              <div className="film-like-btn">
                <FaHeart />
              </div>
              <div className="film-watchlist">
                <FaBookmark />
              </div>
              <div className="film-trailer-video" onClick={handleModal}>
                <FaPlay />
                <p>Play Trailer</p>
              </div>
            </div>
            <div className="film-overview">
              <h1 className="film-overview-title">Overview</h1>
              <p className="film-overview-text">{detailes.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
