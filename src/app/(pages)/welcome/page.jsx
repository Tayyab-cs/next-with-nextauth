"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation.js";

const WelcomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      {session && session ? (
        <div>Welcome to Protected Welcomepage</div>
      ) : (
        <>{router.push("/")}</>
      )}
    </>
  );
};

export default WelcomePage;
