import React from "react";
import getAccount_Info, { Account_InfoModel } from "./account_info.service";
import postTransaction, {
  transaction_progress,
  transaction_progressResponse,
} from "./transaction.service";
import styles from "./transfer.module.css";

export default function Transfer() {
  const Account_Number = sessionStorage.getItem("Account_Number")?.trim();
  const ISO_4217 = sessionStorage.getItem("ISO_4217");

  const lang = {
    ID: {
      From: "DARI REKENING",
      To: "REKENING TUJUAN",
      Transaction_Value: "JUMLAH",
      Send: "KIRIM",
    },
  };

  const [destination, setDestination] = React.useState("");
  const [Account_Info, setAccount_Info] = React.useState<Account_InfoModel>();
  const [Transaction_Value, setTransaction_Value] = React.useState("");
  const [valid, setValid] = React.useState(false);
  const [response, setResponse] = React.useState<transaction_progressResponse>(
    {}
  );

  React.useEffect(() => {
    let pattern = new RegExp("[0-9]");
    if (
      pattern.test(destination) &&
      destination.length === 17 &&
      Account_Number !== destination
    ) {
      const timeout = setTimeout(() => {
        getAccount_Info(destination).then((data) => {
          setAccount_Info(data.account_info);
          setValid(true);
        });
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setAccount_Info({});
      setValid(false);
    }
  }, [Account_Number, destination]);

  function handleParseTransaction_Value(value: string) {
    if (value.length === 1) {
      setTransaction_Value(value.replace(/[^1-9]/g, ""));
    } else {
      setTransaction_Value(value.replace(/[^0-9]/g, ""));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (valid && Account_Number !== destination && Transaction_Value !== "") {
      postTransaction(destination, parseInt(Transaction_Value)).then((data) => {
        setResponse({
          message_code: data.message_code,
          message: data.message,
        });
        setTimeout(() => {
          const location = data.location;
          if (location !== undefined) {
            transaction_progress(location).then((data) => {
              setResponse({
                message_code: data.message_code,
                message: data.message,
                progress: data.progress,
              });
            });
          }
        }, 1000);
      });
    } else {
      setResponse({
        message_code: 400,
        message: "Bad Request",
      });
    }
  }

  return (
    <>
      {Object.entries(response).length !== 0 && (
        <div>
          <p>Message_Code: {response.message_code}</p>
          <p>Message: {response.message}</p>
          {response.progress !== undefined && (
            <p>Progress: {response.progress.message_Code}</p>
          )}
        </div>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label className={styles.f50p}>{ISO_4217 && lang.ID.From}</label>
          <input
            className={styles.f50p}
            type="numnber"
            required
            pattern="[0-9]{17}"
            title="Account Number length must be 17"
            value={Account_Number}
            readOnly
          />
          <div className={styles.f100p} />
        </div>
        <div className={styles.row}>
          <label className={styles.f50p}>{ISO_4217 && lang.ID.To}</label>
          <input
            className={styles.f50p}
            type="number"
            required
            pattern="[0-9]{17}"
            title="Account Number length must be 17"
            onChange={(e) => setDestination(e.target.value)}
          />
          <label className={styles.f100p}>{Account_Info?.Full_Name}</label>
        </div>
        <div className={styles.row}>
          <label className={styles.f50p}>
            {ISO_4217 && lang.ID.Transaction_Value}
          </label>
          <input
            className={styles.f50p}
            type="number"
            required
            value={Transaction_Value}
            pattern="[0-9]"
            onChange={(e) => handleParseTransaction_Value(e.target.value)}
          />
          <div className={styles.f100p} />
        </div>
        <button type="submit">{ISO_4217 && lang.ID.Send}</button>
      </form>
    </>
  );
}
