import React, { useContext, useEffect, useRef, useState } from "react"
import Button from "components/Button"
import useUser from "hooks/useUser"
import styles from "styles/ComposeSoftee.module.css"
import { addSoftee, uploadImage } from "../../../firebase/client"
import router from "next/router"
import Head from "next/head"
import Avatar from "components/Avatar"
import Header from "components/Header"
import Footer from "components/Footer"
import { ThemeContext } from "hooks/themeContext"
import ImageIcon from "components/Icons/ImageIcon"

export default function ComposeSoftee() {
  const inputFileRef = useRef()
  const user = useUser()
  const { toggle: darkMode } = useContext(ThemeContext)
  const [Message, setMessage] = useState("")
  const [hastagOne, setHastagOne] = useState("")
  const [hastagTwo, setHastagTwo] = useState("")
  const [hastagThree, setHastagThree] = useState("")
  const [HastagValue, setHastags] = useState([])
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false)

  const COMPOSE_STATES = {
    USER_NOT_KNOWN: "user_undefined",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  }

  const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3,
  }

  const [Status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [Drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [Task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (Task) {
      const { task, url } = Task
      const onProgress = () => {}

      const onError = (err) => {
        console.error(err)
      }

      const onComplete = async () => {
        setImgURL(url)
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [Task])

  useEffect(() => {
    if (hastagOne && hastagTwo && hastagThree) {
      setIsTextAreaDisabled(true)
    } else {
      setIsTextAreaDisabled(false)
    }
  }, [hastagOne, hastagTwo, hastagThree])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleChangeHastags = (e) => {
    const { value } = e.target
    setHastags(value.toLowerCase())
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      if (!hastagOne) {
        setHastags("")
        if (!HastagValue.replaceAll(" ", "")) {
          return
        }
        return setHastagOne(HastagValue.toLowerCase())
      }
      if (!hastagTwo) {
        setHastags("")
        if (!HastagValue.replaceAll(" ", "")) {
          return
        }
        return setHastagTwo(HastagValue.toLowerCase())
      }
      if (!hastagThree) {
        setHastags("")
        if (!HastagValue.replaceAll(" ", "")) {
          return
        }
        return setHastagThree(HastagValue.toLowerCase())
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const response = await addSoftee({
        avatar: user.avatar,
        content: Message,
        userId: user.userId,
        username: user.username,
        img: imgURL,
        hastags: [
          hastagOne.toLowerCase(),
          hastagTwo.toLowerCase(),
          hastagThree.toLowerCase(),
        ],
      })
      if (response) {
        setStatus(COMPOSE_STATES.SUCCESS)
        router.push("/home")
      }
    } catch (error) {
      setStatus(COMPOSE_STATES.ERROR)
      console.error("Unexpected error:", error)
    }
  }

  const isDisabled = Message.length === 0 || Status === COMPOSE_STATES.LOADING

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    if (
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type.includes("image")
    ) {
      const { task, url } = await uploadImage(e.dataTransfer.files[0])
      setTask({ task, url })
    }
  }

  const handleOnChangeImgInput = async (e) => {
    e.preventDefault()
    if (e.target.files[0] && e.target.files[0].type.includes("image")) {
      const { task, url } = await uploadImage(e.target.files[0])
      setTask({ task, url })
    }
  }

  const textAreaStyles = `${styles.textarea}
  ${Drag === DRAG_IMAGE_STATES.DRAG_OVER && styles.textareaDraggedIn}`

  return (
    <>
      <Head>
        <title>Crear un Softee / Softter</title>
      </Head>
      <Header location="Publicar softee" />
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
          {!imgURL && (
            <>
              <input
                onChange={(e) => {
                  handleOnChangeImgInput(e)
                }}
                type={"file"}
                hidden={true}
                ref={inputFileRef}
              />
              <ImageIcon
                onClick={() => {
                  inputFileRef.current.click()
                }}
                width={30}
                height={30}
                className={styles.imageIcon}
              />
            </>
          )}
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
          <Button disabled={isDisabled}>Enviar</Button>
        </form>
      </section>
      <Footer />
    </>
  )
}

function Hastag({ content, setHastag }) {
  function handleClick() {
    setHastag(null)
  }
  return (
    <>
      <p onClick={handleClick} className={styles.hastag}>
        <span>#</span>
        {content}
        <span className={styles.deleteHastag}>
          <button>x</button>
        </span>
      </p>
    </>
  )
}

function HastagsTextArea({ onChange, onKeyDown, value, darkMode, disabled }) {
  return (
    <div className={styles.hastagsInputWrapper}>
      <span className={styles.beforeInput}>#</span>
      <input
        disabled={disabled}
        size={value.length > 0 ? value.length : 4}
        maxLength={15}
        placeholder="hastags"
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={
          darkMode
            ? `${styles.hastagsArea} ${styles.darkMode}`
            : styles.hastagsArea
        }
        value={value}
      />
    </div>
  )
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
    <div className={styles.textAreaWrapper}>
      <textarea
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        maxLength={150}
        onDrop={onDrop}
        onChange={onChange}
        placeholder="¿Qué esta pasando?"
        className={
          darkMode ? `${textAreaStyles} ${styles.darkMode}` : textAreaStyles
        }
        value={value}
      />
      <p
        className={
          darkMode ? `${styles.charCount} ${styles.darkMode}` : styles.charCount
        }
      >
        {value.length ?? 0}/150
      </p>
    </div>
  )
}
