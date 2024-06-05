"use client";

import axios from "axios";
import CardMovie from "./CardMovie";
import MyPagination from "./Pagination";
import { useEffect, useState } from "react";
import MyPagesLoad from "./MyPagesLoad";

export default function HomePage() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    async function getMovies() {
      const options = {
        cancelToken: source.token,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
        },
      };
      try {
        let response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1`, options);
        setResponse(response);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(`canceled by user`);
        } else {
          console.log(err);
        }
      }
    }
    getMovies();
    return () => {
      source.cancel("canceled");
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
    }
  };
  if (response) {
    return (
      <>
        <div className="allMovies d-flex flex-wrap">{displayData()}</div>
        <MyPagination totalPages={500} />
      </>
    );
  } else {
    return (
      <div className="allMovies d-flex flex-wrap gap-2">
        <MyPagesLoad />;
      </div>
    );
  }
}
