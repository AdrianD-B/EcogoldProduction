import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({})
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ lang, setLang ] = useState("EN")
    
    return (
        <AuthContext.Provider value={{auth,setAuth,loggedIn, setLoggedIn, lang, setLang}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;