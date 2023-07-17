import React, { useState, useContext, useEffect, useMemo } from "react";
import axios from "axios";
import addNotification from "react-push-notification";

import ButtonComponent from "../components/ButtonComponent";
import Popup from "../components/Popup";
import AuthContext from "../context/AuthProvider";
import WSContext from "../context/WSProvider";
import TaskCreator from "./TaskCreator";
import Register from "./Register";

function TaskViewer() {
  const { auth, setLoggedIn, lang } = useContext(AuthContext);
  const { socket } = useContext(WSContext);
  const [buttonPopup, setButtonPopup] = useState({
    visibility: false,
    progress: "",
    quantity: "",
    _id: "",
  });
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [creatorPage, setCreatorPage] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);
  const [query, setQuery] = useState("");

  const [data, setData] = useState([
    {
      name: "",
      model: "",
      description: "",
      size: "",
      color: "",
      quantity: 0,
      task: "",
      date: "",
      progress: 0,
      completiondate: "",
    },
  ]);

  const handleProgressUpdate = async (quantity, progress, _id) => {
    if (progress >= quantity) {
      console.log(progress);
      progress = quantity;
      console.log(progress);
    }
    try {
      const completiondate = new Date().toLocaleString('en-CA', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).replace(/\//g, '-')
      const response = await axios.post(
        "https://ecogoldproduction.onrender.com/api/task/update",
        { progress, _id, completiondate },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(response);
      console.log(completiondate);
      setConfirmPopup(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDataAdmin = async () => {
    try {
      const response = await axios.get(
        `https://ecogoldproduction.onrender.com/api/task/admin`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      let result = response.data;

      setData(result);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((data) => {
      return data.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [data, query]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        handleDataUser();
        addNotification({
          title: "Attention",
          subtitle: "New Task Received",
          message: event.data,
          theme: "darkblue",
          native: true,
        });
      };
    }
  }, [socket]);

  const handleDataUser = async () => {
    try {
      const response = await axios.get(
        `https://ecogoldproduction.onrender.com/api/task/user?name=${auth.name}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      let result = response.data;

      setData(result);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    !auth.admin ? handleDataUser() : handleDataAdmin();
  }, []);

  const saveProgress = (quantity, progress, _id) => {
    if (progress < quantity) {
      console.log(`Progress Saved for row ${_id}`);
      handleProgressUpdate(quantity, progress, _id);
    } else if (progress >= quantity) {
      setButtonPopup({
        visibility: true,
        progress: progress,
        quantity: quantity,
        _id: _id,
      });
    }
    console.log(progress);
  };
  const updateProgress = (e, key) => {
    const updatedData = [...data];
    updatedData[key].progress = parseInt(e.target.value);
    setData(updatedData);
  };

  

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `https://ecogoldproduction.onrender.com/api/user/logout`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(response.data);
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const colors = ["#F8D7DC", "#C8E6C9", "#D6E9F8", "#E6E6FA", "#FFE5B4"];
  var date = new Date(Date.now());

  return (
    <>
      {!auth.admin ? (
        <div className="taskviewer-container">
          <div style={{ textAlign: "center" }}>
            <h1>{auth.name}</h1>
            {date.toISOString().slice(0, 10)}
          </div>
          {data.map((val, key) => {
            return (
              <div
                key={key}
                className="table-container"
                style={{ backgroundColor: colors[key] }}
              >
                <div>
                  <h3>{lang === "EN" ? "Model" : "Modèle"}</h3>
                  <p>{val.model}</p>
                </div>
                <div>
                  <h3>{lang === "EN" ? "Color" : "Couleur"}</h3>
                  <p>{val.color}</p>
                </div>
                <div>
                  <h3>{lang === "EN" ? "Size" : "Taille"}</h3>
                  <p>{val.size}</p>
                </div>
                <div>
                  <h3>{lang === "EN" ? "Quantity" : "Quantité"}</h3>
                  <p>{val.quantity}</p>
                </div>
                <div>
                  <h3>Description</h3>
                  <p>{val.description}</p>
                </div>
                <div>
                  <h3>{lang === "EN" ? "Task" : "Tâche"}</h3>
                  <p>
                    {lang !== "EN" && val.task === "Cutting"
                      ? "Coupage"
                      : lang !== "EN" && val.task === "Sewing"
                      ? "Couture"
                      : lang !== "EN" && val.task === "Prep"
                      ? "Préparation"
                      : val.task}
                  </p>
                </div>
                <div>
                  <h3>{lang === "EN" ? "Progress" : "Progrès"}</h3>
                  <input
                    name="progress"
                    value={val.progress}
                    style={{ width: "30px" }}
                    type="number"
                    placeholder="0"
                    onChange={(e) => updateProgress(e, key)}
                  />
                  <p>{`/${val.quantity}`}</p>
                  <button
                    className="progress-button"
                    onClick={() =>
                      saveProgress(val.quantity, val.progress, val._id)
                    }
                  >
                    {lang === "EN" ? "Save" : "Sauvegarder"}
                  </button>
                </div>
              </div>
            );
          })}
          <Popup
            className="popup-progress"
            trigger={buttonPopup.visibility}
            setTrigger={setButtonPopup}
          >
            <p>
              {lang === "EN"
                ? "Are you sure you have completed this task?"
                : "Êtes-vous sûr d'avoir terminé cette tâche ?"}
            </p>
            <ButtonComponent
              buttonClass="enter-button"
              type="submit"
              buttonText={lang === "EN" ? "Yes" : "Oui"}
              onClick={() =>
                handleProgressUpdate(
                  buttonPopup.quantity,
                  buttonPopup.progress,
                  buttonPopup._id
                )
              }
            />
          </Popup>
          <Popup
            className="popup-save"
            trigger={confirmPopup}
            setTrigger={setConfirmPopup}
          >
            <p>{lang === "EN" ? "Progress saved" : "Progrès sauvegarder"}</p>
          </Popup>
        </div>
      ) : creatorPage ? (
        <TaskCreator setCreatorPage={setCreatorPage} />
      ) : registerPage ? (
        <Register setRegisterPage={setRegisterPage} />
      ) : (
        <div className="taskviewer-container">
          <div className="page-switch-button-container">
            <ButtonComponent
              buttonText={lang === "EN" ? "Logout" : "Se déconnecter"}
              buttonClass="page-switch-button"
              onClick={() => handleLogout()}
            />
            <ButtonComponent
              buttonClass="page-switch-button"
              onClick={() => setRegisterPage(true)}
              buttonText={lang === "EN" ? "Register" : "Enregistrer"}
            />
            <ButtonComponent
              buttonClass="page-switch-button"
              onClick={() => setCreatorPage(true)}
              buttonText={lang === "EN" ? "Task Creator" : "Création de tâche"}
            />
          </div>
          <div>
            <h4>Search</h4>
            <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
          />
          </div>
          <div className="admin-table-container">
            <table>
              <thead>
                <th>{lang === "EN" ? "Name" : "Nom"}</th>
                <th>{lang === "EN" ? "Model" : "Modèle"}</th>
                <th>{lang === "EN" ? "Color" : "Couleur"}</th>
                <th>{lang === "EN" ? "Size" : "Taille"}</th>
                <th>{lang === "EN" ? "Quantity" : "Quantité"}</th>
                <th>{lang === "EN" ? "Task" : "Tâche"}</th>
                <th>Date</th>
                <th>{lang === "EN" ? "Progress" : "Progrès"}</th>
                <th>CompletionDate</th>
              </thead>
              {filteredData.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.model}</td>
                    <td>{val.color}</td>
                    <td>{val.size}</td>
                    <td>{val.quantity}</td>
                    <td>
                      {lang !== "EN" && val.task === "Cutting"
                        ? "Coupage"
                        : lang !== "EN" && val.task === "Sewing"
                        ? "Couture"
                        : lang !== "EN" && val.task === "Prep"
                        ? "Préparation"
                        : val.task}
                    </td>
                    <td>{val.date !== undefined ? val.date.slice(0,10) + " " + val.date.slice(11,16):null}</td>
                    <td>{val.progress}</td>
                    <td>{val.completiondate !== undefined ? val.completiondate.slice(0,10) + " " + val.completiondate.slice(11,16):null}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskViewer;
