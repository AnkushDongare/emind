// import LoginApple from "@/components/common/LoginApple";
import LoginGithub from "@/components/common/LoginGithub";
import LoginGoogle from "@/components/common/LoginGoogle";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full flex my-40 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Sign in</h1>
        <LoginGoogle />
        {/* <LoginApple /> */}
        <LoginGithub />
      </section>
    </div>
  );
};

export default SignIn;
