import * as Yup from "yup";

export const userSignUpSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3),
  picture: Yup.string().optional(),
  status: Yup.string()
    .optional()
    .max(50, "Status cannot be more than 50 characters"),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must have 6 length")
    .max(16, "Password cannot  have 16 more than length")
    .required("Password is required"),
});
