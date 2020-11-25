import React from "react";
import styles from "./history.module.css";
import { TransactionModel } from "./history.service";

export default function Transactions({ transactions }: { transactions: TransactionModel[] }) {
  const Account_Number = sessionStorage.getItem("Account_Number");
  const ISO_4217 = sessionStorage.getItem("ISO_4217");
  const lang = {
    ID: {
      Date: "Tgl.",
      Transaction_Value: "Mutasi",
      Description: "Keterangan",
      Balance: "Saldo",
    },
  };
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{ISO_4217 === "360" && lang.ID.Date}</th>
            <th>{ISO_4217 === "360" && lang.ID.Description}</th>
            <th>{ISO_4217 === "360" && lang.ID.Transaction_Value}</th>
            <th>{ISO_4217 === "360" && lang.ID.Balance}</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            return (
              <tr key={index}>
                <td>{transaction.Date}</td>
                <td>
                  {Account_Number === transaction.Source
                    ? `TRSF DB ${transaction.Destination}`
                    : `TRSF CR ${transaction.Source}`}
                </td>
                <td>{transaction.transaction_Value}</td>
                <td>{transaction.Ending_Balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}