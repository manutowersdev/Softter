import React, { useContext, useEffect } from "react";
import styles from "styles/Header.module.css";
import useUser from "hooks/useUser";
import Avatar from "components/Avatar";
import Back from "components/Back";
import { signOut } from "../../firebase/client";
import Button from "components/Button";
import ThemeButton from "components/ThemeButton";
import { ThemeContext } from "hooks/themeContext";

export default function Header({ location }) {
  const user = useUser();
  const { toggle: darkMode } = useContext(ThemeContext);

  function handleClick() {
    signOut();
  }

  useEffect(() => {
    if (darkMode) {
      document.querySelector("body").classList.add("darkMode");
    } else {
      document.querySelector("body").classList.remove("darkMode");
    }
  }, [darkMode]);

  return (
    <header
      className={
        darkMode ? `${styles.header} ${styles.darkMode}` : styles.header
      }
    >
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
