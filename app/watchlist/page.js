// DONE

import ListsGet from "../Components/ListsGet";
import { cookies } from "next/headers";
import TestClient from "../Components/testClient";

export default function watch() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  return (
    <>
      <TestClient sessionId={sessionId} />
      <div className="container root position-relative" style={{ minHeight: "100vh" }}>
        <p className="main-color fs-3 red-bac mt-5 text-center main-rounded">Watchlist</p>
        <ListsGet type="watchlist" />
      </div>
    </>
  );
}
