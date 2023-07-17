import React, { useContext, useEffect, useState } from "react";

import AuthContext from "./context/AuthProvider";
import Login from "./pages/Login";
import TaskViewer from "./pages/TaskViewer";
import { useCookies } from "react-cookie";
import "./styles/style.css";
import axios from "axios";
import { Notifications } from "react-push-notification";
import { WSProvider } from "./context/WSProvider";
import ButtonComponent from "./components/ButtonComponent";

function App() {
  const { auth, setAuth, loggedIn, setLoggedIn, lang, setLang } = useContext(AuthContext);
  const [cookies, setCookie] = useCookies();
  const [langdisp] = useState([{language: "EN"}]);
  
  if (lang === "EN") {
    langdisp.language = "FR"
  }
  else {
    langdisp.language = "EN"
  }

  const handleAuth = async () => {
    let token = cookies.x_auth;
    if (auth.email === undefined && token !== undefined) {
      try {
        const response = await axios.get(
          `https://ecogoldproduction.onrender.com/api/user/token?token=${token}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: false,
          }
        );
        let result = response.data;

        setAuth({
          name: result.name,
          email: result.email,
          pass: result.password,
          admin: result.admin,
        });
        setLoggedIn(true);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);
  return (
    <div className={!auth.admin ? "admin-App" : "App"}>
      <Notifications />
      <div className="lang-button-container">
      <ButtonComponent
        noChev={true}
        buttonClass="lang-button"
        buttonText={langdisp.language}
        onClick={() => setLang(lang === "EN" ? "FR" : "EN")}
      />
      </div>
      {!loggedIn ? (
        <Login />
      ) : (
        <WSProvider>
          <TaskViewer />
        </WSProvider>
      )}
    </div>
  );
}

export default App;
