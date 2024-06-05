"use client";

// DONE

import { faBookmark, faCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useLayoutEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function AddTo({ movieId }) {
  const [isFav, setIsFav] = useState(false);
  const [isWatch, setIsWatch] = useState(false);
  let [favoriteMovies, setFavoriteMovies] = useState(null);
  let [watchMovies, setWatchMovies] = useState(null);
  const [favDebounc, setFavDebounc] = useState(null);
  const [watchDebounc, setWatchDebounc] = useState(null);
  const [isLoadingForCheck, setIsLoadingForCheck] = useState(false);
  const [handleErr, setHandleErr] = useState([false, ""]);
  const sessionId = Cookies.get("sessionId");
  useLayoutEffect(() => {
    setIsLoadingForCheck(true);
    async function fetchAllWathcMovies() {
      let movies = [];
      let page = 1;
      let totalPages = 1;
      try {
        while (page <= totalPages) {
          const response = await axios.get(`https://api.themoviedb.org/3/account/21012830/watchlist/movies`, {
            params: {
              api_key: "2c8cbe1d27ca2b0b671b01827a6fabf6",
              session_id: sessionId,
              page,
            },
          });
          movies = movies.concat(response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }
        setWatchMovies(movies);
      } catch (error) {
        setIsLoadingForCheck(false);
        console.error("Error fetching favorite movies:", error);
      }
    }
    async function fetchAllFavoriteMovies() {
      let movies = [];
      let page = 1;
      let totalPages = 1;
      try {
        while (page <= totalPages) {
          const response = await axios.get(`https://api.themoviedb.org/3/account/21012830/favorite/movies`, {
            params: {
              api_key: "2c8cbe1d27ca2b0b671b01827a6fabf6",
              session_id: sessionId,
              page,
            },
          });
          movies = movies.concat(response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }
        setFavoriteMovies(movies);
      } catch (error) {
        setIsLoadingForCheck(false);
        console.error("Error fetching favorite movies:", error);
      }
    }
    fetchAllFavoriteMovies();
    fetchAllWathcMovies();
  }, []);
  useLayoutEffect(() => {
    if (watchMovies) {
      if (watchMovies.some((movie) => movie.id == movieId)) {
        setIsWatch(true);
      } else {
        setIsWatch(false);
      }
      setIsLoadingForCheck(false);
    }
  }, [watchMovies]);
  useLayoutEffect(() => {
    if (favoriteMovies) {
      if (favoriteMovies.some((movie) => movie.id == movieId)) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
  }, [favoriteMovies]);
  const handleFav = () => {
    if (sessionId) {
      if (favDebounc) {
        clearTimeout(favDebounc);
      }
      setIsLoadingForCheck(true);
      const timer = setTimeout(() => {
        axios
          .post(
            `https://api.themoviedb.org/3/account/21012830/favorite`,
            {
              media_type: "movie",
              media_id: movieId,
              favorite: !isFav,
            },
            {
              params: {
                api_key: `2c8cbe1d27ca2b0b671b01827a6fabf6`,
                session_id: sessionId,
              },
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.status_message === "Success.") {
              setIsFav(true);
            } else {
              setIsFav(false);
            }
            setIsLoadingForCheck(false);
          })
          .catch(() => {
            setHandleErr([true, "There is a problem, try again later..."]);
            setIsLoadingForCheck(false);
          });
      }, 500);
      setFavDebounc(timer);
    } else {
      setHandleErr([true, "Please login first to add this movie to list"]);
    }
  };
  const handleWatch = () => {
    if (sessionId) {
      if (watchDebounc) {
        clearTimeout(watchDebounc);
      }
      setIsLoadingForCheck(true);
      const timer = setTimeout(() => {
        axios
          .post(
            `https://api.themoviedb.org/3/account/21012830/watchlist`,
            {
              media_type: "movie",
              media_id: movieId,
              watchlist: !isWatch,
            },
            {
              params: {
                api_key: `2c8cbe1d27ca2b0b671b01827a6fabf6`,
                session_id: sessionId,
              },
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.status_message === "Success.") {
              setIsWatch(true);
            } else {
              setIsWatch(false);
            }
            setIsLoadingForCheck(false);
          })
          .catch(() => {
            setHandleErr([true, "There is a problem, try again later..."]);
            setIsLoadingForCheck(false);
          });
      }, 500);
      setWatchDebounc(timer);
    } else {
      setHandleErr([true, "Please login first to add this movie to list"]);
    }
  };
  if (handleErr[0]) {
    setTimeout(() => {
      setHandleErr([false, ""]);
    }, 3000);
  }
  return (
    <div className="d-flex gap-2 mt-3">
      {isLoadingForCheck ? (
        <CircularProgress className="red-color ms-4" />
      ) : (
        <div className="d-flex gap-2 position-relative mb-2">
          <div onClick={handleWatch} className={`loading-bac main-rounded px-2 py-1 px-md-3 py-md-2 main-color pointer ${isWatch ? "red-color" : ""}`}>
            <FontAwesomeIcon icon={isWatch ? faCheck : faBookmark} />
          </div>
          <div onClick={handleFav} className={`loading-bac main-rounded px-2 py-1 px-md-3 py-md-2 main-color pointer ${isFav ? "red-color" : ""}`}>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          {handleErr[0] ? (
            <div className="text-danger position-absolute start-0" style={{ fontSize: "14px", bottom: "-20px", whiteSpace: "nowrap" }}>
              {handleErr[1]}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
