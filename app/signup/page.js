import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function signup() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (sessionId) {
    redirect("/");
  }
  return (
    <>
      <div className="container vh-100 gap-5 d-flex flex-column justify-content-center align-items-center">
        <p className="main-color fs-3 text-center" style={{ maxWidth: "600px" }}>
          This website is built on the TMDB API. Unfortunately, the registration feature is not available except through the official website, but you can register on the official website by clicking on the button below, then you can log in from here.
        </p>
        <a className="fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded" href="https://www.themoviedb.org/signup" target="_blank">
          Go to TMDB
        </a>
      </div>
    </>
  );
}
