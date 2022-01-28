import Footer from "components/Footer"
import Header from "components/Header"
import { ThemeContext } from "hooks/themeContext"
import { useContext, useEffect, useRef, useState } from "react"
import styles from "styles/Search.module.css"
import Search from "components/Icons/Search"
import Hastag from "components/Hastag"
import { useRouter } from "next/router"
import Head from "next/head"
import { getFilteredSoftees } from "../../firebase/client"
// import Softee from "components/Softee"

export default function SearchPage({ softees }) {
  const { query, push } = useRouter()
  const [SearchParams, setSearchParams] = useState({})
  const { toggle: darkMode } = useContext(ThemeContext)
  const searchInput = useRef()

  // Effect for setting query params to State
  useEffect(() => {
    const queryArray = Object.values(SearchParams)
    if (query.t1 && !queryArray.includes(query.t1)) {
      setSearchParams({ ...SearchParams, t1: query.t1 })
    }

    if (query.t2 && !queryArray.includes(query.t2)) {
      setSearchParams({ ...SearchParams, t2: query.t2 })
    }

    if (query.t3 && !queryArray.includes(query.t3)) {
      setSearchParams({ ...SearchParams, t3: query.t3 })
    }
  }, [query])
  // Effect for setting query params at first load
  useEffect(() => {
    const params = Object.values(query)
    if (params.length === 3) {
      setSearchParams({
        t1: params[0],
        t2: params[1],
        t3: params[2],
      })
    } else if (params.length === 2) {
      setSearchParams({
        t1: params[0],
        t2: params[1],
      })
    } else if (params.length === 1) {
      setSearchParams({
        t1: params[0],
      })
    }
    // refreshData()
    console.log("softees", softees)
  }, [])
  // Effect for setting search params to URL
  useEffect(() => {
    push(
      {
        pathname: "/search",
        query: SearchParams,
      },
      undefined,
      {
        shallow: false,
      }
    )
  }, [SearchParams])
  /**
   * @name HandleTitleClick
   * @desc It focuses the input
   * @param {Event} event
   */
  function handleTitleClick(e) {
    searchInput.current.focus()
  }

  function handleHastagClick(queryParam) {
    const paramsArray = Object.values(SearchParams)

    if (paramsArray.length === 3) {
      paramsArray.splice(
        paramsArray.findIndex((param) => param === queryParam),
        1
      )
      return setSearchParams({
        t1: paramsArray[0],
        t2: paramsArray[1],
      })
    } else if (paramsArray.length === 2) {
      paramsArray.splice(
        paramsArray.findIndex((param) => param === queryParam),
        1
      )
      return setSearchParams({
        t1: paramsArray[0],
      })
    } else {
      return setSearchParams({})
    }
  }
  /**
   * HandleAddParam
   * @param {string} param
   */
  function handleAddParam(param) {
    const params = Object.values(SearchParams)
    if (params.length === 3) {
      return setSearchParams({
        t1: param,
        t2: params[0],
        t3: params[1],
      })
    } else if (params.length === 2) {
      return setSearchParams({
        t1: params[0],
        t2: params[1],
        t3: param,
      })
    } else if (params.length === 1) {
      return setSearchParams({
        t1: params[0],
        t2: param,
      })
    } else {
      setSearchParams({
        t1: param,
      })
    }
  }

  function handleKeyDown({ keyCode }) {
    const inpValue = searchInput.current.value.replaceAll(" ", "")

    if (inpValue.length <= 0) {
      return
    }

    if (keyCode === 13) {
      handleAddParam(inpValue)
      searchInput.current.value = ""
    }
  }

  return (
    <>
      <Head>
        <title> Search / Soffter</title>
      </Head>
      <Header location="Search" />
      <section
        className={
          darkMode ? `${styles.wrapper} ${styles.darkMode}` : styles.wrapper
        }
      >
        <p
          onClick={handleTitleClick}
          className={
            darkMode
              ? `${styles.inputPhrase} ${styles.darkMode}`
              : styles.inputPhrase
          }
        >
          ¿Que quieres buscar?
        </p>
        <div className={styles.inputWrapper}>
          <Search width="28" height="25" />
          <input
            maxLength={15}
            ref={searchInput}
            onKeyDown={handleKeyDown}
            placeholder="Search Softter"
            className={
              darkMode
                ? `${styles.searchInput} ${styles.darkMode}`
                : styles.searchInput
            }
          />
        </div>
        <div className={styles.hastagsWrapper}>
          {Object.keys(SearchParams).length > 0 ? (
            Object.values(SearchParams).map((param, index) => {
              return (
                <Hastag
                  key={`${param}${index}`}
                  onClick={() => {
                    handleHastagClick(param)
                  }}
                  content={param}
                  id={index}
                  darkMode={darkMode}
                />
              )
            })
          ) : (
            <>
              <Hastag
                onClick={handleAddParam}
                content={"React"}
                id={1}
                darkMode={darkMode}
              />
              <Hastag
                onClick={handleAddParam}
                content={"Frontend"}
                id={2}
                darkMode={darkMode}
              />
              <Hastag
                onClick={handleAddParam}
                content={"Angular"}
                id={3}
                darkMode={darkMode}
              />
              <Hastag
                onClick={handleAddParam}
                content={"Backend"}
                id={4}
                darkMode={darkMode}
              />
            </>
          )}
        </div>
      </section>
      <section>
        {/* {softees ? (
          softees.map(
            ({
              id,
              username,
              avatar,
              content,
              userId,
              createdAt,
              img,
              hastags,
            }) => {
              return (
                <Softee
                  img={img}
                  key={id}
                  createdAt={createdAt}
                  username={username}
                  avatar={avatar}
                  content={content}
                  id={id}
                  userId={userId}
                  hastags={hastags}
                />
              )
            }
          )
        ) : (
          <h3>No se han encontrado resultados...</h3>
        )} */}
      </section>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    if (Object.values(query).length === 0) {
      console.log("No queries")
      return {
        props: {},
      }
    }
    const softees = await getFilteredSoftees(Object.values(query))
    // const softees = await getLatestSoftees()
    console.log("ssr softees", softees)
    if (!softees) {
      return {
        props: {},
      }
    }
    return {
      props: { softees },
    }
  } catch (error) {
    console.error(error)
  }
}
