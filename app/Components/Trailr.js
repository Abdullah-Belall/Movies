"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

export default function Trail({ movieId }) {
  const [movieKey, setMovieKey] = useState(null);
  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };
  const onReady = (event) => {
    event.target.playVideo();
  };
  useEffect(() => {
    let source = axios.CancelToken.source();
    async function getArrayOfKeys() {
      try {
        let response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2c8cbe1d27ca2b0b671b01827a6fabf6`, { cancelToken: source.token });
        let result = response.data.results;
        const ourRes = result.find((ele) => ele.type === "Trailer");
        setMovieKey(ourRes.key);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log(`canceled by the user`);
        } else {
          console.log(err);
        }
      }
    }
    getArrayOfKeys();
    return () => {
      source.cancel("operation canceled");
    };
  }, []);
  return <>{movieKey ? <YouTube className="myTrailr position-fixed top-50 start-50 translate-middle" style={{ zIndex: "11111111111" }} videoId={movieKey} opts={opts} onReady={onReady} /> : ""}</>;
}
