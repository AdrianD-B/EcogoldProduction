import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({})
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [socket, setSocket] = useState(null)

    useEffect(()=>{
        const ws = new WebSocket('wss://ecogoldproduction.onrender.com/ws')
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