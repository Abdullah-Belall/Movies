import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function profile() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    redirect("/");
  }
  return (
    <div className="container vh-100 position-relative">
      <div className="gap-5 position-absolute start-50 top-50 translate-middle d-flex flex-column justify-content-center align-items-center">
        <p className="main-color fs-3 text-center" style={{ maxWidth: "600px" }}>
          This site is built on the TMDB API. Unfortunately, the option to modify the profile is not available through our website, but you can still modify your account by going to the TMDB website by clicking on the button below.
        </p>
        <a href="https://www.themoviedb.org/settings/profile" target="_blank" className="pointer fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded">
          Go to TMDB
        </a>
      </div>
    </div>
  );
}
