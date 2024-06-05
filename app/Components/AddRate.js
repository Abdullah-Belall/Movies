"use client";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useLayoutEffect, useState } from "react";

export default function AddRate({ movieId }) {
  const [edit, setEdit] = useState(false);
  const [inp, setInp] = useState(null);
  const [err, setErr] = useState([false, ""]);
  const [debounc, setDebounc] = useState(null);
  const [debounc2, setDebounc2] = useState(null);
  const [ratedMovies, setRatedMovies] = useState(null);

  let sessionId = Cookies.get("sessionId");
  function checkRate() {
    if (sessionId) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
        },
      };
      if (debounc2) {
        clearTimeout(debounc2);
      }
      const timer = setTimeout(async () => {
        let page = 1;
        let totalPages = 1;
        let cloneRatedMovies = [];
        while (page <= totalPages) {
          let response = await axios.get(`https://api.themoviedb.org/3/account/21012830/rated/movies?language=en-US&page=${page}&session_id=${sessionId}&sort_by=created_at.asc`, options);
          cloneRatedMovies.push(response.data.results);
          totalPages = response.data.total_pages;
          page++;
        }
        setRatedMovies(cloneRatedMovies.flat());
      }, 200);
      setDebounc2(timer);
    } else {
      setEdit(true);
    }
  }
  useLayoutEffect(() => {
    if (ratedMovies) {
      let trry = ratedMovies.find((e) => {
        e.id == movieId;
        if (e.id == movieId) {
          setInp(e.rating.toString());
        }
        setEdit(!edit);
      });
    }
  }, [ratedMovies]);
  function handleSend() {
    if (sessionId) {
      if (+inp >= 1 && +inp <= 10) {
        if (debounc) {
          clearTimeout(debounc);
        }
        const timer = setTimeout(() => {
          setErr([true, "Loading..."]);
          const RateOptions = {
            method: "POST",
            url: `https://api.themoviedb.org/3/movie/${movieId}/rating`,
            params: { session_id: sessionId },
            headers: {
              accept: "application/json",
              "Content-Type": "application/json;charset=utf-8",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
            },
            data: {
              value: inp,
            },
          };
          axios
            .request(RateOptions)
            .then((response) => {
              if (response.data.status_message === "Success.") {
                setErr([true, "Your rating was added successfully"]);
              } else {
                setErr([true, "Your rating was updated successfully"]);
              }
              setTimeout(() => {
                setEdit(false);
                setErr([false, ""]);
              }, 2000);
            })
            .catch(() => {
              setErr([true, "There is somthing wronge please try again later"]);
            });
        }, 500);
        setDebounc(timer);
      } else {
        setErr([true, "Please enter a vaild rate"]);
      }
    } else {
      setErr([true, "Please Login first to rate this movie"]);
    }
  }
  if (edit) {
    return (
      <div className="position-relative">
        <div className="rating d-flex align-items-center gap-2 ps-2">
          <input value={inp} onChange={(e) => setInp(e.currentTarget.value)} className="loading-bac border-0 fs-5 red-color text-center" style={{ outline: "none", caretColor: "var(--red-color)", height: "25px", width: "30px" }} />
          <p className="red-color m-0 fw-bold fs-md-5">from 10</p>
          <div onClick={handleSend} className="sendAction pointer red-bac main-color px-sm-2 py-sm-1 main-rounded" style={{ fontSize: "12px" }}>
            Send
          </div>
          <div
            onClick={() => {
              setEdit(false);
              setErr([false, ""]);
            }}
            className="sendAction pointer red-bac main-color px-sm-2 py-sm-1 main-rounded"
            style={{ fontSize: "12px" }}
          >
            Cansel
          </div>
        </div>
        {err[0] ? (
          <div className="text-danger position-absolute start-0 ps-2" style={{ fontSize: "16px", bottom: "-25px", whiteSpace: "nowrap" }}>
            {err[1]}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <FontAwesomeIcon onClick={inp ? () => setEdit(true) : checkRate} icon={faPenToSquare} className="addRate ps-2 main-color pointer" />;
  }
}
