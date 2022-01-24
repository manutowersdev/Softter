import Footer from "components/Footer"
import Header from "components/Header"
import { ThemeContext } from "hooks/themeContext"
import { useContext, useEffect, useRef, useState } from "react"
import styles from "styles/Search.module.css"
import Search from "components/Icons/Search"
import Hastag from "components/Hastag"
import { useRouter } from "next/router"

export default function SearchPage() {
  const { query, push } = useRouter()
  const [SearchParams, setSearchParams] = useState({})
  const { toggle: darkMode } = useContext(ThemeContext)
  const searchInput = useRef()

  useEffect(() => {
    const queryArray = Object.values(SearchParams)

    if (query.t1 && !queryArray.includes(query.t1)) {
      setSearchParams({ ...SearchParams, t1: query.t1 })
    }

    if (query.t2 && !queryArray.includes(query.t2)) {
      setSearchParams({ ...SearchParams, t2: query.t2 })
    }

    if (query.t3 && !queryArray.includes(query.t2)) {
      setSearchParams({ ...SearchParams, t3: query.t3 })
    }
  }, [query])

  useEffect(() => {
    const params = Object.values(query)
    console.log("QUERY2", query)
    if (params.length === 3) {
      console.log("TLE")
      setSearchParams({
        t1: params[0],
        t2: params[1],
        t3: params[2],
      })
    } else if (params.length === 2) {
      console.log("DOS")
      setSearchParams({
        t1: params[0],
        t2: params[1],
      })
    } else if (params.length === 1) {
      console.log("UNO")
      setSearchParams({
        t1: params[0],
      })
    }
  }, [])

  useEffect(() => {
    push(
      {
        pathname: "/search",
        query: SearchParams,
      },
      undefined,
      {
        shallow: true,
      }
    )
  }, [SearchParams])

  function handleTitleClick(e) {
    searchInput.current.focus()
  }

  function handleHastagClick(queryParam) {
    if (Object.values(SearchParams).length === 3) {
      const newParams = Object.values(SearchParams).filter(
        (param) => param !== queryParam
      )
      setSearchParams({
        t1: newParams[0],
        t2: newParams[1],
      })
    } else if (Object.values(SearchParams).length === 2) {
      const newParams = Object.values(SearchParams).filter(
        (param) => param !== queryParam
      )
      setSearchParams({
        t1: newParams[0],
      })
    } else {
      setSearchParams({})
    }
  }

  function handleAddParam(param) {
    console.log(param)

    // añadir queryparam
  }

  return (
    <>
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
          Search any technology topic
        </p>
        <div className={styles.inputWrapper}>
          <Search width="28" height="25" />
          <input
            ref={searchInput}
            placeholder="Search Softter"
            className={
              darkMode
                ? `${styles.searchInput} ${styles.darkMode}`
                : styles.searchInput
            }
          />
        </div>
        <div className={styles.hastagsWrapper}>
          {SearchParams ? (
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
      <section></section>
      <Footer />
    </>
  )
}

// export function getServerSideProps() {}
