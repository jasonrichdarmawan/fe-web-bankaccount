import React from "react";
import styles from "./home.module.css";

export default function Home() {
  const Full_Name = sessionStorage.getItem("Full_Name");
  const ISO_4217 = sessionStorage.getItem("ISO_4217");

  const lang = {
    ID: {
      Intro: "Selamat Datang Di Internet Banking",
    },
  };

  return (
    <p className={styles.text}>
      {Full_Name}, {ISO_4217 === "360" && lang.ID.Intro}
    </p>
  );
}
