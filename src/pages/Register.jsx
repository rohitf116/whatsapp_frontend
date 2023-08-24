import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center py-[19px]">
      <div className="flex w-[1600px] mx-auto h-full">
        {/*Register form */}

        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
