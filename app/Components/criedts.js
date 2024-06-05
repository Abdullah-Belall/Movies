import { Avatar } from "@mui/material";
import axios from "axios";

export default async function Criedts({ movieId }) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
    },
  };
  let response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
    ...options,
    next: { revalidate: 5000 },
  });
  let allCriedts = response.data.cast.map((e) => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center gap-1">
        <Avatar sx={{ width: 56, height: 56 }} alt={e.name} src={`https://image.tmdb.org/t/p/w500` + e.profile_path} />
        <p className="holaAmigo main-color" style={{ whiteSpace: "nowrap" }}>
          {e.name}
        </p>
      </div>
    );
  });
  return <>{allCriedts}</>;
}
