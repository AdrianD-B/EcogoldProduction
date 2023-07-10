import React, { useState, useContext, useEffect } from "react";

import AuthContext from "./context/AuthProvider";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TaskViewerUser from "./pages/TaskViewer";
import { useCookies } from "react-cookie";
import "./styles/style.css";
import axios from "axios";

function App() {
  const { auth,setAuth,loggedIn,setLoggedIn } = useContext(AuthContext);
  //const [logToggle, setLogToggle] = useState(true);
  const [cookies, setCookie] = useCookies()

  const handleAuth = async () => {
    let token = cookies.x_auth
    if (auth.email === undefined && token !== undefined) {
      try {
        const response = await axios.get(`https://ecogoldproduction.onrender.com/api/user/token?token=${token}`, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        });
        let result = response.data;

        setAuth({name: result.name, email: result.email, pass: result.password, admin: result.admin})
        setLoggedIn(true)
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }

  useEffect(() => {
    handleAuth()
  }, [])
  return (
    <div className="App">
      {!loggedIn ? (
         (
          <Login />
        ) 
      ) : <TaskViewerUser />}
      
    </div>
  );
}

export default App;
