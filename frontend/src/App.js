import React, { useState, useContext } from "react";

import AuthContext from "./context/AuthProvider";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TaskViewerUser from "./pages/TaskViewerUser";
import TaskViewerAdmin from "./pages/TaskViewerAdmin";
import "./styles/style.css";

function App() {
  const { loggedIn } = useContext(AuthContext);
  const [logToggle, setLogToggle] = useState(true);
  return (
   /* <div className="App">
      {!loggedIn ? (
        logToggle ? (
          <Login setLogToggle={setLogToggle} />
        ) : (
          <Register />
        )
      ) : null}
    </div>*/
 <div><TaskViewerAdmin/></div> );
}

export default App;
