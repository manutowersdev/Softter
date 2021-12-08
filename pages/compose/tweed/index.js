import React, { useState } from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import Button from "../../../components/Button/Button";
import useUser from "../../../hooks/useUser";
import styles from "../../../styles/ComposeTweed.module.css";
import { addTweed } from "../../../firebase/client";
import router from "next/router";
import Head from "next/head";

export default function ComposeTweed() {
  const user = useUser();
  const [Message, setMessage] = useState("");

  const COMPOSE_STATES = {
    USER_NOT_KNOWN: "user_undefined",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  };
  const [Status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await addTweed({
        avatar: user.avatar,
        content: Message,
        userId: user.userId,
        username: user.username,
      });
      if (response) {
        setStatus(COMPOSE_STATES.SUCCESS);
        router.push("/home");
      }
    } catch (error) {
      setStatus(COMPOSE_STATES.ERROR);
      console.error("Unexpected error:", error);
    }
  };

  const isDisabled = Message.length === 0 || Status === COMPOSE_STATES.LOADING;

  return (
    <AppLayout>
      <Head>
        <title>Crear un Tweed / Tweetter</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          placeholder="¿Qué esta pasando?"
          className={styles.textarea}
          value={Message}
        ></textarea>
        <div className={styles.buttonCont}>
          <Button disabled={isDisabled}>Tweed</Button>
        </div>
      </form>
    </AppLayout>
  );
}
