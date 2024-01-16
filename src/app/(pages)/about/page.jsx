"use client";
import { useAppSelector } from "@/lib/hooks.js";

const AboutPage = () => {
  const counter = useAppSelector((state) => state.value);

  return (
    <div>
      <h1> Counter: {counter} </h1>
      <div>Welcome to non-protected route</div>
    </div>
  );
};

export default AboutPage;
