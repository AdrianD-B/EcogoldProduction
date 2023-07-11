import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({})
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [socket, setSocket] = useState(null)

    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:3001')
        setSocket(ws);
        return () => {
            ws.close();
        }
    },[])
    
    return (
        <AuthContext.Provider value={{auth,setAuth,loggedIn, setLoggedIn, socket}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;