import {
  alreadyInUse,
  lenOfStr,
  notFound,
  pleaseProvide,
  pleaseProvideValid,
} from "./index.js";
//name
export const pleaseProvideName = pleaseProvide("name");
//email
export const pleaseProvideEmail = pleaseProvide("email address");
export const emailIsAlreadyInUse = alreadyInUse("email");
export const pleaseProvideValidEmail = pleaseProvideValid("email address");

//password
export const pleaseProvidePassword = pleaseProvide("password");
export const minPasswordLen = lenOfStr("password", 6);
export const maxPasswordLen = lenOfStr("password", 128, "less than");
export const userNotFound = notFound("user");
