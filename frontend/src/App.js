import React, { useState, useContext, useEffect } from "react";

import AuthContext from "./context/AuthProvider";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TaskViewerUser from "./pages/TaskViewerUser";
import TaskViewerAdmin from "./pages/TaskViewerAdmin";
import { useCookies } from "react-cookie";
import "./styles/style.css";
import axios from "axios";

function App() {
  const { auth,setAuth,loggedIn,setLoggedIn } = useContext(AuthContext);
  const [logToggle, setLogToggle] = useState(true);
  const [cookies, setCookie] = useCookies()

  const handleAuth = async () => {
    let token = cookies.x_auth
    if (auth.email === undefined) {
      try {
        const response = await axios.get(`http://localhost:3001/api/user/token?token=${token}`, 
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
        logToggle ? (
          <Login setLogToggle={setLogToggle} />
        ) : (
          <Register />
        )
      ) : <TaskViewerUser />}
    </div>
  );
}

export default App;
