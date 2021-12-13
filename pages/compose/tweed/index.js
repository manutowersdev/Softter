import React, { useEffect, useState } from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import Button from "../../../components/Button/Button";
import useUser from "../../../hooks/useUser";
import styles from "../../../styles/ComposeTweed.module.css";
import { addTweed, uploadImage } from "../../../firebase/client";
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

  const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3,
  };

  const [Status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [Drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [Task, setTask] = useState(null);
  // const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (Task) {
      const onProgress = (progress) => {
        console.log(progress);
      };

      const onError = (err) => {
        console.log(err);
      };

      const onComplete = (complete) => {
        console.log(complete);
      };
      console.log(Task);
      Task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [Task]);

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    if (
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type.includes("image")
    ) {
      const task = await uploadImage(e.dataTransfer.files[0]);
      setTask(task);
    }
  };

  return (
    <AppLayout>
      <Head>
        <title>Crear un Tweed / Tweetter</title>
      </Head>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onChange={handleChange}
          placeholder="¿Qué esta pasando?"
          className={`${styles.textarea}
            ${
              Drag === DRAG_IMAGE_STATES.DRAG_OVER && styles.textareaDraggedIn
            }`}
          value={Message}
        ></textarea>
        <div className={styles.buttonCont}>
          <Button disabled={isDisabled}>Tweed</Button>
        </div>
      </form>
    </AppLayout>
  );
}
