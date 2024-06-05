"use client";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const [isGuest, setIsGuset] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      setIsGuset(false);
    } else {
      setIsGuset(true);
    }
  }, []);
  const segment = useSelectedLayoutSegment();
  // const navLinks = [
  //   { id: `${uuidv4()}`, name: "Home", goTo: null },
  //   { id: `${uuidv4()}`, name: "Browes", goTo: "browes" },
  //   { id: `${uuidv4()}`, name: "Favorite", goTo: "favorite" },
  //   { id: `${uuidv4()}`, name: "Watchlist", goTo: "watchlist" },
  // ];
  // const disNavLink = navLinks.map((e) => {
  //   return (
  //     <Link key={e.id} href={e.goTo === null ? "/" : `/` + e.goTo} className={segment === e.goTo ? "NavActive" : ""}>
  //       <p className="mylinkspage normal">{e.name}</p>
  //     </Link>
  //   );
  // });
  function handleLogout() {
    const sessionId = Cookies.get("sessionId");
    axios
      .delete(`https://api.themoviedb.org/3/authentication/session?api_key=2c8cbe1d27ca2b0b671b01827a6fabf6`, {
        data: {
          session_id: sessionId,
        },
      })
      .then(() => {
        Cookies.remove("sessionId");
        setIsGuset(true);
      })
      .catch((error) => {
        console.error("Error deleting session:", error.response.data);
      });
  }
  useEffect(() => {
    let source = axios.CancelToken.source();
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      const options = {
        cancelToken: source.token,
        method: "GET",
        url: "https://api.themoviedb.org/3/account/21012830",
        params: {
          session_id: sessionId,
        },
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
        },
      };
      axios
        .request(options)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log(`canceled by user`);
          } else {
            console.error(err);
          }
        });
    }
    return () => {
      source.cancel("operation canceled");
    };
  }, []);

  return (
    <>
      <div
        onClick={(e) => {
          const sideBar = e.currentTarget.nextElementSibling;
          if (sideBar.classList.contains("showon")) {
            sideBar.classList.remove("showon");
            e.currentTarget.style.cssText = "left: 0px !important; top: 200px;z-index: 11111111";
          } else {
            e.currentTarget.style.cssText = "left: 160px !important; top: 200px;z-index: 11111111";
            sideBar.classList.add("showon");
          }
        }}
        className="menuBar d-md-none position-fixed start-0 px-2 red-bac rounded-end pointer main-color"
        style={{ top: "200px", zIndex: "11111111" }}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <aside className="sideBar d-flex flex-column vh-100 start-0 top-0" style={{ zIndex: "11111" }}>
        <Link href={"/"}>
          <div className="logo">Morror</div>
        </Link>
        {/* <div className="navContainer d-flex flex-column">{disNavLink}</div> */}
        <div className="navContainer d-flex flex-column">
          <Link href={"/"} className={segment === null ? "NavActive" : ""}>
            <p className="mylinkspage normal">Home</p>
          </Link>
          <Link href={"/browes"} className={segment === "browes" ? "NavActive" : ""}>
            <p className="mylinkspage normal">Browes</p>
          </Link>
          <Link href={"/favorite"} className={segment === "favorite" ? "NavActive" : ""}>
            <p className="mylinkspage normal">Favorite</p>
          </Link>
          <Link href={"/watchlist"} className={segment === "watchlist" ? "NavActive" : ""}>
            <p className="mylinkspage normal">Watchlist</p>
          </Link>
        </div>
        <div className="navFooter d-flex flex-column gap-2">
          {isGuest ? (
            <>
              <Link href="/login" className={segment === "login" ? "NavActive" : ""}>
                <p className="normal mylinkspage" style={{ fontSize: "18px" }}>
                  Log in
                </p>
              </Link>
              <Link href="/signup" className={segment === "signup" ? "NavActive" : ""}>
                <p className="normal mylinkspage" style={{ fontSize: "18px" }}>
                  Sign up
                </p>
              </Link>
            </>
          ) : (
            <div className="d-flex flex-column gap-4">
              <Link href="/profile" className={segment === "profile" ? "NavActive" : ""}>
                <div className="d-flex gap-2 align-items-center">
                  <Avatar className="red-bac main-color" sx={{ width: 35, height: 35 }} alt={userDetails ? userDetails.username : ""} src={userDetails ? `https://image.tmdb.org/t/p/w500${userDetails.avatar.tmdb.avatar_path}` : ""} />
                  <p className="mylinkspage normal" style={{ fontSize: "18px" }}>
                    {userDetails ? userDetails.username : ""}
                  </p>
                </div>
              </Link>
              <p onClick={handleLogout} className="mylinkspage mylinkspage normal pointer" style={{ fontSize: "18px" }}>
                logout
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
