import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import jwt_decode from "jwt-decode";

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      sessionStorage.clear();
    },
  },
});

export const { login, logout } = authorizationSlice.actions;

interface LoginResponse {
  message_code: number;
  message: string;
  Full_Name: string;
  token: string;
  ISO_4217: string;
}

export const loginAsync = (endpoint: string, User_ID: string, PIN: number | string) => async (
  dispatch: AppDispatch
) => {
  const response = await fetch(`${process.env.REACT_APP_baseUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      User_ID,
      PIN,
    }),
  });
  await response.json().then((data: LoginResponse) => {
    if (data.message_code === 200) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("Full_Name", data.Full_Name);
      sessionStorage.setItem("ISO_4217", data.ISO_4217);
      const decoded: { exp: number; Account_Number: string } = jwt_decode(
        data.token
      );
      sessionStorage.setItem("Account_Number", decoded.Account_Number);

      if (endpoint === "api/v1/admin/login") {
        sessionStorage.setItem("admin", "true");
      }

      dispatch(login());
    } else if (data.message_code === 404) {
      // TODO
    }
  });
};

export const selectIsLoggedIn = (state: RootState) =>
  state.authorization.isLoggedIn;

export default authorizationSlice.reducer;
