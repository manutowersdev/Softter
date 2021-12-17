import React, { useEffect, useState } from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import Button from "../../../components/Button/Button";
import useUser from "../../../hooks/useUser";
import styles from "../../../styles/ComposeSoftee.module.css";
import { addSoftee, uploadImage } from "../../../firebase/client";
import router from "next/router";
import Head from "next/head";
import Avatar from "../../../components/Avatar/Avatar";

export default function ComposeSoftee() {
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
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (Task) {
      const { task, url } = Task;
      const onProgress = (progress) => {
        console.log(progress);
      };

      const onError = (err) => {
        console.log(err);
      };

      const onComplete = async (complete) => {
        console.log(complete);
        setImgURL(url);
      };
      task.on("state_changed", onProgress, onError, onComplete);
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
      const response = await addSoftee({
        avatar: user.avatar,
        content: Message,
        userId: user.userId,
        username: user.username,
        img: imgURL,
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
      const { task, url } = await uploadImage(e.dataTransfer.files[0]);
      setTask({ task, url });
    }
  };

  return (
    <AppLayout>
      <Head>
        <title>Crear un Softee / Softter</title>
      </Head>
      <section className={styles.composeSofteeWrapper}>
        {user && (
          <section className={styles.avatar}>
            <Avatar src={user.avatar} />
          </section>
        )}
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
          {imgURL && (
            <section className={styles.ImgSection}>
              <button
                className={styles.deleteImgButton}
                onClick={() => setImgURL(null)}
              >
                X
              </button>
              <img className={styles.uploadedImg} src={imgURL} />
            </section>
          )}
          <div className={styles.buttonCont}>
            <Button disabled={isDisabled}>Softeet</Button>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}
