import React from "react";
import getBalance from "./balance.service";

export default function Balance() {
  const Account_Number = sessionStorage.getItem("Account_Number");
  const ISO_4217 = sessionStorage.getItem("ISO_4217");

  const lang = {
    Account_Number: ISO_4217 === "360" && "No. Rekening",
    Currency: ISO_4217 === "360" && "Mata Uang",
    Balance: ISO_4217 === "360" && "Saldo Efektif",
  };

  const currency = ISO_4217 === "360" && "IDR";

  const [balance, setBalance] = React.useState<string | number>("");

  React.useEffect(() => {
    getBalance().then(data => {
      setBalance(data.balance);
    })
  })

  return (
    <table>
      <thead>
        <th>{lang.Account_Number}</th>
        <th>{lang.Currency}</th>
        <th>{lang.Balance}</th>
      </thead>
      <tbody>
        <td>{Account_Number}</td>
        <td>{currency}</td>
        <td>{balance}</td>
      </tbody>
    </table>
  );
}
