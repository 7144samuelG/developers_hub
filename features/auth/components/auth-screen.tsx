"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import Image from "next/image";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="h-full flex items-center bg-[#34ebb1] justify-center  ">
      <div className="">
        <h1 className="font-bold text-sky-700 text-4xl">DevelopersHub</h1>
        <Image alt="dev" src="/devs.png" width={100} height={300} className="h-[400px] w-full"/>
        <p className="text-xl leading-[28px] w-3/4 pt-10">
          Connect with like minded developers to tackle real word problems
        </p>
      </div>
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
