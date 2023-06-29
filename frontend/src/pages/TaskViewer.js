import React, { useState, useContext, useEffect } from 'react'
import ButtonComponent from '../components/ButtonComponent'
import Popup from '../components/Popup'
import AuthContext from '../context/AuthProvider';
import TaskCreator from './TaskCreator';
import axios from "axios"

function TaskViewer() {

  const { auth } = useContext(AuthContext);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [creatorPage, setCreatorPage] = useState(false);
  
  const [data, setData] = useState([
    { name: "", model: "", description:"",  size: "", color: "", quantity: 0, task: "", date:"", progress: 0 }
  ])


  const handleProgressUpdate = async (quantity, progress, _id) => {
    
    if (progress>=quantity) {progress=quantity}
    try {
      const response = await axios.post("http://localhost:3001/api/task/update", {progress, _id},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        });
      console.log(response)
      console.log(progress)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  

  const handleDataAdmin = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/task/admin`, 
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false
      });
      let result = response.data;

      setData(result)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(()=>{
    handleDataAdmin();
  },[])


  const saveProgress = (quantity, progress, _id) => {
    if (progress < quantity) {
      console.log(`Progress Saved for row ${_id}`)
      handleProgressUpdate(quantity, progress, _id)
    }
    else if (progress >= quantity) { setButtonPopup(true) }
    console.log(progress)

    
  }
  const updateProgress = (e, key) => {
    const updatedData = [...data];
    updatedData[key].progress = parseInt(e.target.value);
    setData(updatedData);
  };

  return (
    <>
    {
      auth.admin ?
        (<div className='taskviewer-container'>

          <h2> TaskViewer </h2>
          <table>
            <tr>
              <th>Model</th>
              <th>Color</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Task</th>
              <th>Progress</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.model}</td>
                  <td>{val.color}</td>
                  <td>{val.size}</td>
                  <td>{val.quantity}</td>
                  <td>{val.description}</td>
                  <td>{val.task}</td>
                  <td><input
                    name="progress"
                    value={val.progress}
                    type="number"
                    placeholder='0'
                    onChange={(e) => updateProgress(e, key)}
                  />
                    <p>{`/${val.quantity}`}</p>
                  </td>
                  <td>
                    <button className="progress-button" onClick={() => saveProgress(val.quantity, val.progress, val._id)}
                    >Save Progress</button>
                  </td>
                </tr>
              )
            })}
          </table>



          <Popup className="popup-progress" trigger={buttonPopup} setTrigger={setButtonPopup}>
            <p>Are you sure you have completed this task?</p>
            <ButtonComponent buttonClass="enter-button" type="submit" buttonText={"Yes"} onClick = {handleProgressUpdate} />
          </Popup>
        </div >)
        : creatorPage ? <TaskCreator setCreatorPage={setCreatorPage}/> :(<div className='taskviewer-container'>

          <h2> TaskViewer </h2>
          <table>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Color</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Task</th>
              <th>Progress</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.model}</td>
                  <td>{val.color}</td>
                  <td>{val.size}</td>
                  <td>{val.quantity}</td>
                  <td>{val.task}</td>
                  <td>{val.progress}</td>
                </tr>
              )
            })}
          </table>
          <ButtonComponent buttonClass="page-switch-button" onClick={() => setCreatorPage(true)} buttonText="Task Creator" />
        </div >)}
      </>
    )
}

export default TaskViewer