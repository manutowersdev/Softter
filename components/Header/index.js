import React from "react";
import styles from "styles/Header.module.css";
import useUser from "hooks/useUser";
import Avatar from "components/Avatar";
import Back from "components/Back";

export default function Header({ location }) {
  const user = useUser();

  return (
    <header className={styles.header}>
      {location !== "Inicio" && <Back width={50} />}
      <Avatar src={user?.avatar} />
      <h2 className={styles.h2}>{location}</h2>
    </header>
  );
}
