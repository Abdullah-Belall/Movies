import React from "react";
import MySWiperr from "./Components/Myswiperr";
import HandleHomePage from "./Components/handleAllHomePages";

export default function Home() {
  return (
    <>
      <div className="root container" style={{ width: "calc(100% - 298px)" }}>
        <div className="mb-5 d-flex flex-column justify-content-center align-items-center gap-5">
          <MySWiperr />
          <HandleHomePage />
        </div>
      </div>
    </>
  );
}

// poster link
// https://image.tmdb.org/t/p/w500
// trenPage
// https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1
// import { animateScroll as scroll } from "react-scroll";
// scroll.scrollToTop({ smooth: true });
