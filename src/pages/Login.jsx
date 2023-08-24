import React from "react";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center py-[19px]">
        <div className="flex w-[1600px] mx-auto h-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
