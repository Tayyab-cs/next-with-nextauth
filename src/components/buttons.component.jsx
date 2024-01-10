"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};

export const WelcomeButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <button
      style={{ marginRight: 10 }}
      onClick={() => {
        if (session) {
          router.push("/welcome", { scroll: false });
        } else {
          router.push("/api/auth/signin", { scroll: false });
        }
      }}
    >
      Welcome
    </button>
  );
};

export const AboutButton = () => {
  return <Link href="/about">About</Link>;
};
