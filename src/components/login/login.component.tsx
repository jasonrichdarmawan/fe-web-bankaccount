import React, { FormEvent } from "react";
import styles from "./login.module.css";

export default function LoginComponent({
  onChangeUser_ID,
  onChangePIN,
  handleLogin,
}: {
  onChangeUser_ID: (value: React.SetStateAction<string>) => void;
  onChangePIN: (value: React.SetStateAction<string | number>) => void;
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
}) {
  function handleParsePIN(e: React.ChangeEvent<HTMLInputElement>) {
    if (isNaN(parseInt(e.target.value))) {
      onChangePIN("");
    } else {
      onChangePIN(parseInt(e.target.value));
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.text}>Login</p>
      <form onSubmit={handleLogin}>
        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan User ID Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your User ID
          </p>
          <input
            type="text"
            pattern="^[a-zA-Z0-9]{12}$"
            title="Minimum and Maximum User_ID length is 12 characters and does not have special characters"
            required
            onChange={(e) => onChangeUser_ID(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan PIN Internet Banking Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your Internet Banking PIN
          </p>
          <input
            type="password"
            pattern="^[0-9]{6}$"
            title="Minimum and Maximum PIN length is 6"
            required
            onChange={(e) => handleParsePIN(e)}
          />
        </label>
        <br />
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
