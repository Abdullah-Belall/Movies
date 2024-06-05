"use client";
import axios, { Axios } from "axios";
import MyPagination from "./Pagination";
import CardMovie from "./CardMovie";
import MyPagesLoad from "./MyPagesLoad";
import BackButton from "./goBack";
import { useEffect, useState } from "react";

export default function MoviePages({ pageNum }) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const options = {
      cancelToken: source.token,
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
      },
    };
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageNum}`, options)
      .then((response) => {
        setResponse(response);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(`axios =>` + err);
        } else {
          console.log(`simpleErr` + err);
        }
      });
    return () => {
      source.cancel("done yo bro");
    };
  }, []);

  let displayData = () => {
    if (response) {
      return response.data.results.map((e) => {
        return (
          <div key={e.id} className="movieCardcon">
            <CardMovie pad={"px-5 py-3"} id={e.id} title={e.original_title} rate={e.vote_average} poster={e.poster_path} />
          </div>
        );
      });
    } else {
      return (
        <div className="allMovies d-flex flex-wrap gap-2">
          <MyPagesLoad />;
        </div>
      );
    }
  };

  return (
    <div className="root container" style={{ width: "calc(100% - 298px)" }}>
      <div className="mt-5">
        <BackButton />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mb-5 mt-4 gap-4">
        <div className="allMovies d-flex flex-wrap">{displayData()}</div>
        <MyPagination totalPages={500} pageNum={pageNum} />
      </div>
    </div>
  );
}
