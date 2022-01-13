import React, { useContext, useEffect, useState } from "react";
import Button from "components/Button";
import useUser from "hooks/useUser";
import styles from "styles/ComposeSoftee.module.css";
import { addSoftee, uploadImage } from "../../../firebase/client";
import router from "next/router";
import Head from "next/head";
import Avatar from "components/Avatar";
import Header from "components/Header";
import Footer from "components/Footer";
import { ThemeContext } from "hooks/themeContext";

export default function ComposeSoftee() {
  const user = useUser();
  const { toggle: darkMode } = useContext(ThemeContext);
  const [Message, setMessage] = useState("");
  const [hastagOne, setHastagOne] = useState(null);
  const [hastagTwo, setHastagTwo] = useState(null);
  const [hastagThree, setHastagThree] = useState(null);
  const [HastagValue, setHastags] = useState([]);
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false);

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

  useEffect(() => {
    if (hastagOne && hastagTwo && hastagThree) {
      setIsTextAreaDisabled(true);
    } else {
      setIsTextAreaDisabled(false);
    }
  }, [hastagOne, hastagTwo, hastagThree]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleChangeHastags = (e) => {
    const { value } = e.target;
    if (value) {
      setHastags(value);
      // console.log(e);
    }
    console.log("value", value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      if (!hastagOne) {
        console.log("Writing H1");
        setHastags("");
        return setHastagOne(HastagValue);
      }
      if (!hastagTwo) {
        console.log("Writing H2");
        setHastags("");
        return setHastagTwo(HastagValue);
      }
      if (!hastagThree) {
        console.log("Writing H3");
        setHastags("");
        return setHastagThree(HastagValue);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const textAreaStyles = `${styles.textarea}
  ${Drag === DRAG_IMAGE_STATES.DRAG_OVER && styles.textareaDraggedIn}`;

  return (
    <>
      <Head>
        <title>Crear un Softee / Softter</title>
      </Head>
      <Header location="Post softee" />
      <section
        className={
          darkMode
            ? `${styles.composeSofteeWrapper} ${styles.darkMode}`
            : styles.composeSofteeWrapper
        }
      >
        {user && (
          <section className={styles.avatar}>
            <Avatar src={user.avatar} />
          </section>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <SoffteeTextArea
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onChange={handleChange}
            darkMode={darkMode}
            value={Message}
            textAreaStyles={textAreaStyles}
          />
          <div className={styles.hastagsWrapper}>
            <HastagsTextArea
              onChange={handleChangeHastags}
              onKeyDown={handleKeyDown}
              value={HastagValue}
              darkMode={darkMode}
              disabled={isTextAreaDisabled}
            />
            {hastagOne && (
              <Hastag content={hastagOne} setHastag={setHastagOne} />
            )}
            {hastagTwo && (
              <Hastag content={hastagTwo} setHastag={setHastagTwo} />
            )}
            {hastagThree && (
              <Hastag content={hastagThree} setHastag={setHastagThree} />
            )}
          </div>
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
          <Button disabled={isDisabled}>Softeet</Button>
        </form>
      </section>
      <Footer />
    </>
  );
}

function Hastag({ content, setHastag }) {
  function handleClick() {
    setHastag(null);
  }
  return (
    <>
      <p onClick={handleClick} className={styles.hastag}>
        #{content}
        <span className={styles.deleteHastag}>
          <button>x</button>
        </span>
      </p>
    </>
  );
}

function HastagsTextArea({ onChange, onKeyDown, value, darkMode, disabled }) {
  return (
    <input
      disabled={disabled}
      size={4}
      maxLength={15}
      placeholder="#hastags"
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={
        darkMode
          ? `${styles.hastagsArea} ${styles.darkMode}`
          : styles.hastagsArea
      }
      value={value}
    ></input>
  );
}

function SoffteeTextArea({
  onDragEnter,
  onDragLeave,
  onDrop,
  onChange,
  darkMode,
  value,
  textAreaStyles,
}) {
  return (
    <textarea
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onChange={onChange}
      placeholder="¿Qué esta pasando?"
      className={
        darkMode ? `${textAreaStyles} ${styles.darkMode}` : textAreaStyles
      }
      value={value}
    ></textarea>
  );
}
