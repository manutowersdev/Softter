import Footer from "components/Footer"
import Header from "components/Header"
import { ThemeContext } from "hooks/themeContext"
import { useContext, useEffect, useRef, useState } from "react"
import styles from "styles/Search.module.css"
import Search from "components/Icons/Search"
import Hastag from "components/Hastag"
import { useRouter } from "next/router"
import Head from "next/head"
import Softee from "components/Softee"

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
        t1: params[0].toLowerCase(),
        t2: params[1].toLowerCase(),
        t3: params[2].toLowerCase(),
      })
    } else if (params.length === 2) {
      setSearchParams({
        t1: params[0].toLowerCase(),
        t2: params[1].toLowerCase(),
      })
    } else if (params.length === 1) {
      setSearchParams({
        t1: params[0].toLowerCase(),
      })
    }
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
        t1: paramsArray[0].toLowerCase(),
        t2: paramsArray[1].toLowerCase(),
      })
    } else if (paramsArray.length === 2) {
      paramsArray.splice(
        paramsArray.findIndex((param) => param === queryParam),
        1
      )
      return setSearchParams({
        t1: paramsArray[0].toLowerCase(),
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
        t1: param.toLowerCase(),
        t2: params[0].toLowerCase(),
        t3: params[1].toLowerCase(),
      })
    } else if (params.length === 2) {
      return setSearchParams({
        t1: params[0].toLowerCase(),
        t2: params[1].toLowerCase(),
        t3: param.toLowerCase(),
      })
    } else if (params.length === 1) {
      return setSearchParams({
        t1: params[0].toLowerCase(),
        t2: param.toLowerCase(),
      })
    } else {
      setSearchParams({
        t1: param.toLowerCase(),
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
      <Header location="Búsqueda" />
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
        <div
          className={
            darkMode
              ? `${styles.hastagsWrapper} ${styles.darkMode}`
              : styles.hastagsWrapper
          }
        >
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
      <section
        className={
          darkMode
            ? `${styles.softeesWrapper} ${styles.darkMode}`
            : styles.softeesWrapper
        }
      >
        {softees ? (
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
                  onHastagClick={handleAddParam}
                  onClick={true}
                />
              )
            }
          )
        ) : (
          <Softee
            img={null}
            key={"testKey"}
            createdAt={new Date()}
            username={"Usuario Softter"}
            avatar={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAS1BMVEX////h4eGZmZnf39/j4+Pm5ub09PT7+/vs7Ozo6Oj4+Pjw8PCWlpaTk5OamprY2Nimpqa/v7/Pz8+srKyioqLHx8e+vr63t7fU1NQ98dxgAAAEVklEQVR4nO2dW3eqMBCFrQlXAyLWev7/Lz1EpPWC0FDYE8P+HvrQtXBlM5OZSchlsyGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBXkjzepVmk9Ydq0DrK0l2cJ9LNmokkTq20ZxqhafzuKht1WvWI+0HpN1aZxFmf6XqMmb2lyCT9nbyryDSXbrAj8Yhz9rhrFks32oE8cpR3NeS7aIwjV/t92/EtNObZRHktmff9cfcnfZadtIRBYpf4+QrtsRn/bsCWVFrIC5JpEbSPyMsKYBYP7fAxqM7loR3eBZx0ag58hfKsM/4tCfaTSYu6IVlCYCPRm3gzYxC9x5uQuowFLZ446nICPZGYLijQi/JmN3eauEeJ58V4UX0W4eommbNU60fLBtSl8sQtkaTAZaNMh2BXzCECJbvi8p2wRUsJnHvA9BohP0X5qEVm6mbJau0Rkept+Vx/i0SwQYWZFoGkGC9bjz6i8D0Ra0IBI2J7oQXdE5GBtAWc9nNsL7Qo7BgDU3LfAx3uA4aFz0AHivg4Y0HGGnycsQBLNxEnhbqpjJMi3VQiklpw0VTGSYFJP8Gn+xZY0pfqhriOKNUNcR0RMQ3cD2gIJZQNLaCMiJxje1SIGenLBRpUqMFNBD+DmRqWC6WoYDo2sNC6d/PBOL94EDO8GE4W+qM+HNQUiXp/OtQjGjHpYrANWh23xpQnd4n6VBqzPQ6/HExlOtyEL7NtKPeuErUq7YPm7IHCwYZGF4Fb42xEfWifLAc7gYIoHBxZREWr8DBVYeG9wqptaO2ssG5fTeW7Ql2XjURznBBpjvbBcvjVeKCwkVgV5fk+Iuooih4b/vQ/rb5MUY3YHqNwxDyXpt+3fV8V1UNw7fmf7nsRjz/ug8JnbN80n3dm1erTjPU5OYXOzbrEV3NrscaCZjRu9v4URKHzhHcbX81n3dadzZ/604zHzT4wdanz2EL/K9tkfj6ppqup0/Ga3P85OzxmbOE+PuwkGlNYzFWgc85EjQ8njPF165a3WKd1/yHMGD+f0DK9PxZ3Aoujc21uwczTTJpra6JLte3saLbVadIoGfX1aeIuX1Wfq9J2w+pcTxoi45acTJ2ouRQt0VPJ4wBqzjv87xbhf3sK//vhCr4Bh/8dP/y1GOGvp1nBmqjw17WFvzZRIumjV3rj3RS90Dv8dd7wJSf43V3gld5KYNMM1ogSG/TC3/cU/t61Few/DH8P6Qr2AcOCjeDxZhg/FT39A+GnomcqrOBcjPDPNlnB+TQrOGNo2RLci3OilpToicAVnNe2lER/ztzbhH9u4mYFZ1+u4PzSFZxBO2uNKl2LvmSu8sZDD+2YslzqCT899JvQz2TfrOBc/c2Uuy06VOS3g/4wMXFE72C/Dvc7Lt7jbotbcsd7ZnzNgEOEflfQhcDve7pyubOr13Qh3NnV8X3vmgrx3jVCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgiS/8cMRAmf+3K8AAAAAElFTkSuQmCC"
            }
            content={"No hay resultados con esta búsqueda. 😌"}
            id={"id"}
            userId={"idUser"}
            hastags={["prueba", "otra", "busqueda"]}
            onClick={false}
            onHastagClick={handleAddParam}
          />
        )}
      </section>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    if (Object.values(query).length === 0) {
      return {
        props: {},
      }
    }

    const reducer = (acc, curr) => {
      if (query[curr]) {
        if (curr === "t1") {
          return (acc += `?${curr}=${query[curr]}`)
        } else {
          return (acc += `&${curr}=${query[curr]}`)
        }
      }
    }

    const queryString = Object.keys(query).reduce(reducer, "")

    const res = await fetch(
      `http://192.168.5.139:3000/api/filterSoftees?${queryString}`
    )

    if (res.statusText !== "OK") {
      throw new Error("Error fetching the softee data.")
    }

    const softees = await res.json()

    return { props: softees }

    // const softees = await getLatestSoftees()
  } catch (error) {
    console.error(error)
  }
}
