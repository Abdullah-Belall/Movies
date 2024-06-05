"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../globals.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import axios from "axios";
import { v4 } from "uuid";

export default function MySWiperr() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const [swiperImg, setSwiperImg] = useState([]);
  const page = 1;

  useEffect(() => {
    let source = axios.CancelToken.source();
    const options = {
      cancelToken: source.token,
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
      },
    };
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`, options)
      .then((res) => {
        setSwiperImg(res.data.results.slice(0, 5));
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(`canceled by the user`);
        } else {
          console.log(err);
        }
      });
    return () => {
      source.cancel("operation canceled");
    };
  }, []);
  const disSwiperImgs = swiperImg.map((e) => {
    return (
      <SwiperSlide key={v4()}>
        <Image className="w-100 h-100" fill style={{ objectFit: "contain" }} src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`} alt="err" />
      </SwiperSlide>
    );
  });
  return (
    <div className="w-100 main-rounded position-relative mt-2 mt-md-5 overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {disSwiperImgs}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
