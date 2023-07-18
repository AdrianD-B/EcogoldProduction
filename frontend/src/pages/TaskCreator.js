import React, { useState, useEffect, useContext } from "react";
import ButtonComponent from "../components/ButtonComponent";
import FormInput from "../components/FormInput";
import WSContext from "../context/WSProvider";
import axios from "axios";

function TaskCreator({ setCreatorPage }) {
  const [formDetails, setFormDetails] = useState({});
  const [users, setUsers] = useState([{ _id: 0, name: "test" }]);
  const { socket } = useContext(WSContext);

  const handleFormInputChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleTaskCreation = async (e) => {
    e.preventDefault();
    console.log(formDetails);
    try {
      const response = await axios.post(
        "https://ecogoldproduction.onrender.com/api/task/create",
        formDetails,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      socket.send(
        JSON.stringify({
          eventName: "create",
          recipient: formDetails.name,
          data: formDetails.description,
        })
      );
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://ecogoldproduction.onrender.com/api/task/getUsers",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="taskcreator-container">
      <h2> TaskCreator </h2>
      <button className="create-task-button-container">
      <ButtonComponent
            buttonClass="page-switch-button"
            onClick={() => setCreatorPage(false)}
            buttonText="Task Viewer"
          />
          </button>
      <form className="task-creation-form" onSubmit={handleTaskCreation}>
        <div>
          <div className="input-form-container">
            <h4>Name</h4>
            <input
              className="creation-form-item"
              list="userlist"
              name="name"
              onChange={handleFormInputChange}
            />
            {users.length > 0 && (
              <datalist id="userlist">
                {users.map((user) => (
                  <option key={user._id} value={user.name} />
                ))}
              </datalist>
            )}
          </div>

          <FormInput
            inputClass="creation-form-item"
            value={formDetails.model}
            onChange={handleFormInputChange}
            inputType="string"
            header="Model"
          />
          <FormInput
            inputClass="creation-form-item"
            value={formDetails.description}
            onChange={handleFormInputChange}
            inputType="string"
            header="Description"
          />
          <FormInput
            inputClass="creation-form-item"
            value={formDetails.color}
            onChange={handleFormInputChange}
            inputType="string"
            header="Color"
          />
        </div>
        <div>
          <FormInput
            inputClass="creation-form-item"
            value={formDetails.size}
            onChange={handleFormInputChange}
            inputType="string"
            header="Size"
          />
          <FormInput
            inputClass="creation-form-item"
            value={formDetails.quantity}
            onChange={handleFormInputChange}
            inputType="number"
            header="Quantity"
          />
          <div className="input-form-container">
            <h4>Task</h4>
            <input
              className="creation-form-item"
              list="tasks"
              name="task"
              onChange={handleFormInputChange}
            />
            <datalist id="tasks">
              <option value="Cutting" />
              <option value="Sewing" />
              <option value="Prep" />
            </datalist>
          </div>
          <button type="submit" className="button-container">
            <ButtonComponent
              buttonClass="page-switch-button"
              buttonText="Create Task"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskCreator;
