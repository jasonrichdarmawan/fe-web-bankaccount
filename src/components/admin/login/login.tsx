import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../../features/authorization/authorizationSlice";
import LoginComponent from "../../login/login.component";

export default function AdminLogin() {
  const [User_ID, setUser_ID] = useState<string>("");
  const [PIN, setPIN] = useState<number | string>("");

  const dispatch = useDispatch();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    dispatch(loginAsync("api/v1/admin/login", User_ID, PIN));
  }

  return (
    <LoginComponent
      onChangeUser_ID={(e) => setUser_ID(e)}
      onChangePIN={(e) => setPIN(e)}
      handleLogin={handleLogin}
    />
  );
}
