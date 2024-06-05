import axios from "axios";
import CardMovie from "./CardMovie";
import Link from "next/link";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function MovieReco({ paramsMovie }) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
    },
  };
  let recoResponse = await axios(`https://api.themoviedb.org/3/movie/${paramsMovie}/recommendations?language=en-US&page=1`, {
    ...options,
    next: { revalidate: 5000 },
  });
  let needed = recoResponse.data.results.slice(0, 6);
  let disRecomed = needed.map((e) => {
    return (
      <div key={e.id} className="movieCardconReco">
        <CardMovie id={e.id} pad={"py-2"} rate={e.vote_average} titfs={"fs-4"} title={e.title} poster={e.poster_path} />;
      </div>
    );
  });
  if (recoResponse.data.results.length != 0) {
    return (
      <>
        <Link href={`/spmovie/${paramsMovie}/recommendations`}>
          <Button variant="text" className="MorelikeThis position-absolute pointer end-0 pe-4 d-flex align-items-center gap-2" style={{ color: "#888", top: "-7px" }}>
            More like This <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Link>
        {disRecomed}
      </>
    );
  } else {
    return "";
  }
}
