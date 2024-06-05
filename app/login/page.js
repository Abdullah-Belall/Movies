"use client";

// DONE 2

import Link from "next/link";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const [nextStep, setNextStep] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [approved, setArrroved] = useState(false);
  const [err, setErr] = useState([false, ""]);
  const router = useRouter();
  const sessionIdd = Cookies.get("sessionId");
  if (sessionIdd) {
    router.push("/");
  }
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzhjYmUxZDI3Y2EyYjBiNjcxYjAxODI3YTZmYWJmNiIsInN1YiI6IjY1Y2ZhOTk0ZmRmOGI3MDE4NjY4MDBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fof9RcpxAb5VIZZyzEsg5D3-MFzhbsl2GeNCASld1-k",
    },
  };
  const payload = {
    request_token: nextStep,
  };
  function goToApprove() {
    axios
      .get("https://api.themoviedb.org/3/authentication/token/new", options)
      .then((response) => {
        window.open("https://www.themoviedb.org/authenticate/" + response.data.request_token);
        setNextStep(response.data.request_token);
        setErr([false, ""]);
      })
      .catch(() => {
        setErr([true, "There is a problem please try again later..."]);
      });
  }
  function handleSessionId() {
    axios
      .post("https://api.themoviedb.org/3/authentication/session/new?api_key=2c8cbe1d27ca2b0b671b01827a6fabf6", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSessionId(response.data.session_id);
      })
      .catch((err) => {
        console.error(err.response);
      });
    setArrroved(true);
  }
  useLayoutEffect(() => {
    if (sessionId && approved) {
      Cookies.set("sessionId", sessionId, { expires: 30 });
      setTimeout(() => {
        window.location.href = "http://localhost:3000/"; //end here
      }, 2000);
    }
  }, [sessionId]);
  if (nextStep) {
    if (approved) {
      if (!sessionId) {
        return (
          <div className="gap-5 container vh-100 position-relative mx-5 d-flex flex-column justify-content-center align-items-center">
            <div className="position-absolute start-50 top-50 w-100 translate-middle d-flex flex-column align-items-center">
              <p className="main-color fs-3 text-center w-100">Unfortunately, something is wrong. Please make sure that you have approved the request on the TMDB website and try again.</p>
              <div
                onClick={() => {
                  setNextStep(null);
                  setArrroved(false);
                }}
                className="pointer w-fit fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded"
              >
                Try again
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="gap-5 container vh-100 position-relative mx-5 d-flex flex-column justify-content-center align-items-center">
            <div className="position-absolute start-50 top-50 w-100 translate-middle d-flex flex-column align-items-center">
              <p className="main-color fs-3 text-center w-100">Thank you, you will now be redirected to the home page</p>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="gap-5 container vh-100 position-relative mx-5 d-flex flex-column justify-content-center align-items-center">
          <div className="position-absolute start-50 top-50 w-100 translate-middle d-flex flex-column align-items-center">
            <p className="main-color fs-3 text-center w-100">If you have authenticated on the TMDB website, click the button below</p>
            <div onClick={handleSessionId} className="pointer w-fit fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded">
              Done
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="gap-5 container vh-100 position-relative mx-5 d-flex flex-column justify-content-center align-items-center">
        <div className="position-absolute start-50 top-50 w-100 translate-middle d-flex flex-column align-items-center">
          <p className="main-color fs-3 text-center w-100">
            This site is based on the TMDB API, so I must obtain permission from it in order for us to display your data on our website. Therefore, you must click on the button below. It will redirect you to the TMDB site in order to give us permission. If you do not have an account on the TMDB site,{" "}
            <Link href={"/signup"}>
              <span className="red-color">click here. </span>
            </Link>
            but if you already have an account Click the button below
          </p>
          <div onClick={goToApprove} className="pointer w-fit fw-bold red-bac main-color fs-5 px-5 py-2 main-rounded">
            Go to TMDB
          </div>
          {err[0] ? (
            <p className="text-danger mt-2" style={{ fontSize: "16px", whiteSpace: "nowrap" }}>
              {err[1]}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
