import React from "react";
import styles from "./register.module.css";
import postRegister, {
  RegisterModel,
  RegisterResponse,
} from "./register.service";

export default function Register() {
  const [state, setState] = React.useState<RegisterModel>({
    PIN: "",
    Full_Name: "",
    Birth_Date: "",
    ISO_4217: "",
    Address_3: "",
    Address_4: "",
    Address_1: "",
    Address_2: "",
    Zip_Code: "",
    ISO_3166_1: "",
  });

  const [info, setInfo] = React.useState<RegisterResponse>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (
      e.target.name === "PIN" ||
      e.target.name === "ISO_4217" ||
      e.target.name === "Zip_Code" ||
      e.target.name === "ISO_3166_1"
    ) {
      // bug prevention: if user delete the last number, it crash the input
      if (isNaN(parseInt(e.target.value))) {
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: "",
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: parseInt(e.target.value),
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    postRegister(state).then((data) => {
      if (data.message_code === 201) {
        sessionStorage.setItem("token", `Bearer + data.token`);
        setInfo({
          message_code: data.message_code,
          message: data.message,
          User_ID: data.User_ID,
        });
      } else {
        // TODO
        setInfo({ message_code: data.message_code, message: data.message });
      }
    });
  }

  return (
    <div className={styles.container}>
      <p className={styles.text}>Register</p>

      {Object.entries(info).length !== 0 && (
        <div className={[styles.container, styles.border].join(" ")}>
          <p className={styles.text}>{info.message_code}</p>
          <p className={styles.text}>{info.message}</p>
          {info.User_ID && <p>CREATED: {info.User_ID}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
            name="PIN"
            value={state.PIN}
            type="password"
            pattern="^[0-9]{6}$"
            title="Minimum and Maximum PIN length is 6"
            required
            onChange={(e) => handleChange(e)}
          />
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan Nama Lengkap Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your Full Name
          </p>
          <input
            name="Full_Name"
            value={state.Full_Name}
            type="text"
            pattern="\s*(?:[a-zA-Z]\s*){8,35}$"
            title="Minimum name length is 8 letters to 35 letters"
            required
            onChange={(e) => handleChange(e)}
          />
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan Tanggal Lahir Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your Birth Date
          </p>
          <input
            name="Birth_Date"
            value={state.Birth_Date}
            type="date"
            onChange={(e) => handleChange(e)}
            required
          />
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan pilih Mata Uang Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please choose Your Currency
          </p>
          <select name="ISO_4217" required onChange={(e) => handleChange(e)}>
            <option></option>
            <option value={360}>IDR</option>
          </select>
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan Kecamatan Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your District
          </p>
          <input
            name="Address_3"
            value={state.Address_3}
            type="text"
            required
            pattern="\s*(?:[a-zA-Z0-9]\s*){8,35}$"
            title="Minimum name length is 8 letters to 35 letters"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan Kelurahan Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your Sub-district
          </p>
          <input
            name="Address_4"
            value={state.Address_4}
            type="text"
            required
            pattern="\s*(?:[a-zA-Z0-9]\s*){8,35}$"
            title="Minimum name length is 8 letters to 35 letters"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan Alamat Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your Address
          </p>
          <input
            name="Address_1"
            value={state.Address_1}
            type="text"
            required
            pattern="\s*(?:[a-zA-Z0-9]\s*){8,35}$"
            title="Minimum name length is 8 letters to 35 letters"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan Kota Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your City
          </p>
          <input
            name="Address_2"
            value={state.Address_2}
            type="text"
            required
            pattern="\s*(?:[a-zA-Z0-9]\s*){8,35}$"
            title="Minimum name length is 8 letters to 35 letters"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan Kode Pos Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your Zip Code
          </p>
          <input
            name="Zip_Code"
            value={state.Zip_Code}
            type="number"
            required
            pattern="[0-9]{5}"
            title="Minimum and Maximum Zip Code length is 5"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <br />

        <label>
          <p
            className={[styles.text, styles.colorblue, styles.underline].join(
              " "
            )}
          >
            Silahkan masukkan Negara Anda
          </p>
          <p className={[styles.text, styles.colororange].join(" ")}>
            Please enter Your Nationality
          </p>
          <select name="ISO_3166_1" required onChange={(e) => handleChange(e)}>
            <option></option>
            <option value={360}>Indonesia</option>
          </select>
        </label>

        <br />
        <br />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
