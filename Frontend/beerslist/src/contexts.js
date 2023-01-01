import { createContext, useState } from "react"

const ConnexionContext = createContext()

export const ConnexionContextProvider = ({ children }) => {
  const [connexion, setConnexion] = useState(false)

  return (
    <ConnexionContext.Provider
      value={{ connexion, setConnexion }}
    >
      {children}
    </ConnexionContext.Provider>
  )
}

export default ConnexionContext