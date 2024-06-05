// DONE

import { cookies } from "next/headers";
import ListsGet from "../Components/ListsGet";
import TestClient from "../Components/testClient";

export default function fav() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  return (
    <>
      <TestClient sessionId={sessionId} />
      <div className="container root position-relative" style={{ minHeight: "100vh" }}>
        <p className="main-color fs-3 red-bac mt-5 text-center main-rounded">Favoritelist</p>
        <ListsGet type="favorite" />
      </div>
    </>
  );
}
