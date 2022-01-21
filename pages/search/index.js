import Footer from "components/Footer"
import Header from "components/Header"
import { ThemeContext } from "hooks/themeContext"
import { useContext, useEffect, useRef, useState } from "react"
import styles from "styles/Search.module.css"
import Search from "components/Icons/Search"
import Hastag from "components/Hastag"
import { useRouter } from "next/router"

export default function SearchPage() {
  const { query } = useRouter()
  const [SearchParams, setSearchParams] = useState([])
  const { toggle: darkMode } = useContext(ThemeContext)
  const searchInput = useRef()

  useEffect(() => {
    if (query.t1 && !SearchParams.includes(query.t1)) {
      setSearchParams([...SearchParams, query.t1])
    }

    if (query.t2 && !SearchParams.includes(query.t2)) {
      setSearchParams([...SearchParams, query.t2])
    }
    if (query.t3 && !SearchParams.includes(query.t3)) {
      setSearchParams([...SearchParams, query.t3])
    }
  }, [query])

  useEffect(() => {
    const params = Object.values(query)
    setSearchParams(params)
  }, [])

  function handleTitleClick(e) {
    searchInput.current.focus()
  }

  function handleHastagClick(queryParam) {
    const newParams = SearchParams.filter((param) => param !== queryParam)
    setSearchParams(newParams)
    // eliminar queryparam
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
          {SearchParams.length ? (
            SearchParams.map((param, index) => {
              return (
                <div
                  key={`${param}${index}`}
                  onClick={() => {
                    handleHastagClick(param)
                  }}
                >
                  <Hastag content={param} id={index} darkMode={darkMode} />
                </div>
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
