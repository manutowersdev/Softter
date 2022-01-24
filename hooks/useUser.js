import router from "next/router"
import { useEffect, useState } from "react"
import { onAuthStateChangedFunction } from "../firebase/client"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    onAuthStateChangedFunction(setUser)
    console.log("Usuario logueado.")
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return user
}
