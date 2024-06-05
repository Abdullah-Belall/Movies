"use client";
import { useEffect, useMemo, useState } from "react";
import MobileCard from "./MobileCard";
import axios from "axios";
import { v4 } from "uuid";
import MyPagination from "./Pagination";

export default function MobileHome() {
  const [allallMovies, setAllAllMovies] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const options = {
      cancelToken: source.token,
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
      },
    };
    async function getMoviesForMobileHome() {
      try {
        let page = 1;
        let neededPages = 2;
        let cloneMovies = [];
        while (page <= neededPages) {
          let response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`, options);
          cloneMovies.push(response.data.results);
          page++;
        }
        console.log(cloneMovies);
        setAllAllMovies(cloneMovies.flat());
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(`canceled by the user`);
        } else {
          console.log(err);
        }
      }
    }
    getMoviesForMobileHome();
    return () => {
      source.cancel("operation canceled");
    };
  }, []);

  // ==================================
  let displayDataForMobiles1 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(0, 10).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard id={e.id} poster={e.poster_path} />
          </div>
        );
      });
    }
  }, [allallMovies]);
  let displayDataForMobiles2 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(10, 20).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard id={e.id} poster={e.poster_path} />
          </div>
        );
      });
    }
  }, [allallMovies]);
  let displayDataForMobiles3 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(20, 30).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard id={e.id} poster={e.poster_path} />
          </div>
        );
      });
    }
  }, [allallMovies]);
  let displayDataForMobiles4 = useMemo(() => {
    if (allallMovies) {
      return allallMovies.slice(30, 40).map((e) => {
        return (
          <div key={e.id} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
            <MobileCard id={e.id} poster={e.poster_path} />
          </div>
        );
      });
    }
  }, [allallMovies]);
  const loading = () => {
    let allLoading = [];
    for (let i = 0; i < 4; i++) {
      allLoading.push(
        <div key={v4()} style={{ minWidth: "120px", aspectRatio: "0.701" }}>
          <div className="loading-Ani loading-bac main-rounded w-100 h-100"></div>
        </div>
      );
    }
    return allLoading;
  };
  if (allallMovies) {
    return (
      <>
        <div className="d-flex flex-column gap-5 w-100">
          <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles1}</div>
          <div className="allMovies2 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles2}</div>
          <div className="allMovies3 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles3}</div>
          <div className="allMovies4 d-flex gap-2 overflow-x-scroll">{displayDataForMobiles4}</div>
        </div>
        <MyPagination totalPages={498} />
      </>
    );
  }
  return (
    <div className="d-flex flex-column gap-5 w-100">
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
      <div className="allMovies1 d-flex gap-2 overflow-x-scroll">{loading()}</div>
    </div>
  );
}
