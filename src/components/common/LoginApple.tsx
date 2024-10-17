"use client";
import { login } from "@/actions/auth";
import React from "react";
import { FaApple } from "react-icons/fa";

const LoginApple = () => {
  return (
    <div
      onClick={() => login("apple")}
      className="w-full gap-4  hover:cursor-pointer mt-6 h-12 bg-black rounded-md p-4 flex justify-center items-center"
    >
      <FaApple className="text-white" />
      <p className="text-white">Login with Apple</p>
    </div>
  );
};

export default LoginApple;
