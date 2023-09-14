import { PulseLoader } from "react-spinners";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import AuthInput from "./AuthInput";
import { useState } from "react";
import { userSignInSchema } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, loginUser } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSignInSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { status, error } = useSelector((state) => state.user);
  const [localError, setLocalError] = useState("");
  const onFieldChange = () => {
    setLocalError("");
  };
  const onSubmit = async (data) => {
    let res = await dispatch(loginUser({ ...data }));
    console.log(res?.payload?.user);
    if (res?.payload?.user) {
      navigate("/");
    } else if (res?.payload) {
      setLocalError(res.payload); // Set localError if there's an error from the API
    }
  };
  return (
    <div className="h-screen w-full  flex items-center justify-center overflow-hidden">
      {/**Container */}
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*Headig*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        {/*Form*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={onFieldChange}
          className="mt-6 space-y-6"
        >
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* if we have an error */}
          {localError ? (
            <div>
              <p className="text-red-400">{localError}</p>
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="w-full flex jsutify-center bg-green_1 text-grey-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign in"
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Dont have account ?</span>
            <Link to="/register">Register</Link>
          </p>
        </form>
        <form className="mt-6 space-y-6"></form>
      </div>
    </div>
  );
};

export default LoginForm;
