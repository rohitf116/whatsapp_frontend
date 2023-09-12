import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;
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
export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
        ...values,
      });
      return data;
    } catch (error) {
      const message = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return rejectWithValue(message);
    }
  }
);
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
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.error = "";
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.user = action?.payload?.user || {};
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
