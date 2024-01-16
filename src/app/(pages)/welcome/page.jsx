"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation.js";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/lib/features/counter/counterSlice.js";

const WelcomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const counter = useSelector((state) => state.value);
  const dispatch = useDispatch();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (status === "authenticated") {
    return (
      <>
        <h1>Counter: {counter}</h1>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          incrementbyamount
        </button>
        <div>Welcome to Protected Welcome Page</div>
      </>
    );
  }
};

export default WelcomePage;
