"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation.js";

const WelcomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("session: ", session);
  console.log("session status: ", status);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (status === "authenticated") {
    return <div>Welcome to Protected Welcome Page</div>;
  }
};

export default WelcomePage;
