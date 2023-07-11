import { createContext, useEffect, useState, useContext } from "react";
import AuthContext from "./AuthProvider";
const WSContext = createContext({});

export const WSProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const ws = new WebSocket("wss://ecogoldproduction.onrender.com/ws");

    ws.onopen = () => {
      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.event === 'serverReady') {
          ws.send(JSON.stringify({ event: 'login', data: auth.name }));
        }
      });
    };
    
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  return <WSContext.Provider value={{ socket }}>{children}</WSContext.Provider>;
};

export default WSContext;
