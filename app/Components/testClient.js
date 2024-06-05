"use client";

import { useRouter } from "next/navigation";

export default function TestClient({ sessionId }) {
  const router = useRouter();
  if (!sessionId) {
    router.push("/login");
  }
  return;
}
