import { createSlice } from "@reduxjs/toolkit";
const emptyUserData = {
  _id: "",
  name: "",
  email: "",
  picture: "",
  status: "",
  token: "",
};
const initialState = {
  status: "",
  error: "",
  user: { _id: "", name: "", email: "", picture: "", status: "", token: "" },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        _id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
      };
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
