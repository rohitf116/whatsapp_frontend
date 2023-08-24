import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthInput from "./AuthInput";
import { userSignUpSchema } from "../../utils/validations";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSignUpSchema),
  });
  const onSubmit = (data) => console.log(data);
  return (
    <div className="h-screen w-full  flex items-center justify-center overflow-hidden">
      {/**Container */}
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*Headig*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign Up</p>
        </div>
        {/*Form*/}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors?.name?.message}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
