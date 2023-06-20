import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({})
    const [ loggedIn, setLoggedIn ] = useState(false)
    return (
        <AuthContext.Provider value={{auth,setAuth,loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;