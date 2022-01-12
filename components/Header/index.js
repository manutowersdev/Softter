import React from "react";
import styles from "styles/Header.module.css";
import useUser from "hooks/useUser";
import Avatar from "components/Avatar";
import Back from "components/Back";
import { signOut } from "../../firebase/client";
import Button from "components/Button";
import ThemeButton from "components/ThemeButton";

export default function Header({ location }) {
  const user = useUser();

  function handleClick() {
    signOut();
  }

  return (
    <header className={styles.header}>
      {location !== "Inicio" && <Back width={50} />}
      <Avatar src={user?.avatar} />
      <h2 className={styles.h2}>{location}</h2>
      <ThemeButton />
      <Button onClick={handleClick} disabled={false}>
        Salir
      </Button>
    </header>
  );
}
