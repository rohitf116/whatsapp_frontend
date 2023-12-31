import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import AuthInput from "./AuthInput";
import { userSignUpSchema } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser } from "../../features/userSlice";
import { useState } from "react";
import Picture from "../Picture";
import axios from "axios";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSignUpSchema),
  });

  // useSelector
  const [localError, setLocalError] = useState("");
  const [picture, setPicture] = useState("");
  const [readablePicture, setReadablePicture] = useState("");
  let { status } = useSelector((state) => state.user);

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", "l2vrirdh");
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/dukehbdsz/image/upload`,
      formData
    );
    console.log({ data });
    return data;
  };
  const onSubmit = async (data) => {
    dispatch(changeStatus("loading"));
    let res;
    if (picture) {
      uploadImage().then(async (ss) => {
        res = await dispatch(registerUser({ ...data, picture: ss.secure_url }));
        if (res?.payload?.user) {
          navigate("/");
        } else if (res?.payload) {
          setLocalError(res.payload); // Set localError if there's an error from the API
        }
      });
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
      if (res?.payload?.user) {
        navigate("/");
      } else if (res?.payload) {
        setLocalError(res.payload); // Set localError if there's an error from the API
      }
    }
  };

  const onFieldChange = () => {
    setLocalError("");
  };
  return (
    <div className="h-screen w-full  flex items-center justify-center overflow-hidden">
      {/**Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*Headig*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign Up</p>
        </div>

        {/*Form*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={onFieldChange}
          className="mt-6 space-y-6"
        >
          <AuthInput
            name="name"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
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
              "Sign up"
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account ?</span>
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
