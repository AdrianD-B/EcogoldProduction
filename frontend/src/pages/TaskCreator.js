import React, { useState, useEffect } from 'react'
import ButtonComponent from '../components/ButtonComponent'
import FormInput from '../components/FormInput';
import axios from "axios"


function TaskCreator({ setCreatorPage }) {
  const [formDetails, setFormDetails] = useState({})
  const [users, setUsers] = useState([{_id: 0, name:"test"}])

  const handleFormInputChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleTaskCreation = async (e) => {
    e.preventDefault()
    console.log(formDetails)
    try {
      const response = await axios.post("http://localhost:3001/api/task/create", formDetails,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        });
      console.log(response)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/task/getUsers",
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        });
      setUsers(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='taskcreator-container'>

      <h2> TaskCreator </h2>
      <form className="task-creation-form" onSubmit={handleTaskCreation}>
        <div>
        <input className="login-form-item" list="userlist" name="name" onChange={handleFormInputChange} />
          {users.length > 0 && (
          <datalist id="userlist">
          {users.map(user => (
            <option key={user._id} value={user.name} />
            
          ))}
        </datalist>
        )}
            
        <FormInput
          inputClass="login-form-item"
          value={formDetails.model}
          onChange={handleFormInputChange}
          inputType="string"
          header="Model"
        />
        <FormInput
          inputClass="login-form-item"
          value={formDetails.description}
          onChange={handleFormInputChange}
          inputType="string"
          header="Description"
        />
        <FormInput
          inputClass="login-form-item"
          value={formDetails.color}
          onChange={handleFormInputChange}
          inputType="string"
          header="Color"
        />
        </div>
        <div>
        <FormInput
          inputClass="login-form-item"
          value={formDetails.size}
          onChange={handleFormInputChange}
          inputType="string"
          header="Size"
        />
        <FormInput
          inputClass="login-form-item"
          value={formDetails.quantity}
          onChange={handleFormInputChange}
          inputType="number"
          header="Quantity"
        />

        <input className="login-form-item" list="tasks" name="task" onChange={handleFormInputChange} />
        <datalist id="tasks">
          <option value="Cutting" />
          <option value="Sewing" />
          <option value="Prep" />
        </datalist>
        <ButtonComponent buttonClass="page-switch-button" onClick={() => setCreatorPage(false)} buttonText="Task Viewer" />
        <button type="submit" className="create-task-button-container"><ButtonComponent buttonClass="create-task-button" buttonText="Create Task" /></button>
        </div>
      </form>
    </div >
  )
}

export default TaskCreator