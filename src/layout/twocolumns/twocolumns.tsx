import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authorization/authorizationSlice";
import styles from "./twocolumns.module.css";

interface ChildrenProps {
  children: JSX.Element;
}

export default function TwoColumns(props: ChildrenProps): JSX.Element {
  const isAdmin = sessionStorage.getItem("admin");
  const ISO_4217 = sessionStorage.getItem("ISO_4217");
  const dispatch = useDispatch();

  const lang = {
    ID: {
      History: "Histori Transaksi",
      Transfer: "Transfer Dana",
      Balance: "Informasi Saldo",
      AdminTransfer: "Penambahan Dana",
    },
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.mright} onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
      <div className={styles.section}>
        <div className={styles.nav}>
          <ul>
            <li>
              <a href="/history">{ISO_4217 === "360" && lang.ID.History}</a>
            </li>
            <li>
              <a href="/transfer">{ISO_4217 === "360" && lang.ID.Transfer}</a>
            </li>
            <li>
              <a href="/balance">{ISO_4217 === "360" && lang.ID.Balance}</a>
            </li>
            {isAdmin === "true" && (
              <li>
                <a href="/admin/transfer">
                  {ISO_4217 === "360" && lang.ID.AdminTransfer}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className={styles.article}>{props.children}</div>
      </div>
    </div>
  );
}
