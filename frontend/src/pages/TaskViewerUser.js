import React, { useState , useContext} from 'react'
import ButtonComponent from '../components/ButtonComponent'
import Popup from '../components/Popup'
import AuthContext from '../context/AuthProvider';






  
function TaskViewer() {

  const { auth } = useContext(AuthContext);
  
  const [buttonPopup, setButtonPopup] = useState(false);

  
  const [data, setData] = useState([
    { model: 22, colour: "black", size: "large", quantity: 2, description:"smooth", task: "cutting", progress: 0 },
    { model: 22, colour: "black", size: "large", quantity: 2, description:"smooth", task: "cutting", progress: 0 }
  ])
  

  
  const saveProgress = (quantity,progress,key) =>{
  if (progress < quantity ) {
    console.log(`Progress Saved for row ${key}`)
  }
  else if (progress >= quantity) {setButtonPopup(true)}
  console.log(progress)
}
  const updateProgress = (e,key) => {
    const updatedData = [...data];
    updatedData[key].progress = parseInt(e.target.value);
    setData(updatedData);
  };

  if (auth.admin===false) {
  return (
    
    <div className='taskviewer-container'>
      
      <h2> TaskViewer </h2>
      <table>
        <tr>
          <th>Model</th>
          <th>Colour</th>
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
              <td>{val.colour}</td>
              <td>{val.size}</td>
              <td>{val.quantity}</td>
              <td>{val.description}</td>
              <td>{val.task}</td>
              <td><input 
              name="progress"
              value={val.progress}
              type="number"
              placeholder='0'
              onChange={(e) => updateProgress(e,key)}
              />
              <p>{`/${val.quantity}`}</p>
              </td>
              <td>
              <button className="progress-button" onClick={() => saveProgress(val.quantity, val.progress, key)}
              >Save Progress</button>
              </td>
            </tr>
          )
        })}
      </table>
      
      
      
      <Popup className="popup-progress" trigger={buttonPopup} setTrigger={setButtonPopup}>
      <p>Are you sure you have completed this task?</p>
      <ButtonComponent buttonClass="enter-button" type="submit" buttonText={"Yes"}/>
      </Popup>
    </div >
    
    
  )}
  else {return (
    <div className='taskviewer-container'>

        <h2> TaskViewer </h2>
        <table>
            <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Colour</th>
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
                        <td>{val.colour}</td>
                        <td>{val.size}</td>
                        <td>{val.quantity}</td>
                        <td>{val.task}</td>
                        <td>{val.progress}</td>
                    </tr>
                )
            })}
        </table>
        <ButtonComponent buttonClass="page-switch-button" onClick={() => setCreatorPage(true)} buttonText="Task Creator"/>
    </div >
)}
}
// onClick={"function for axios post"} <button className="progress-button" onClick={() => setButtonPopup(true)}>Edit Progress</button>
//<ButtonComponent buttonClass="progress-button" onClick={() => setButtonPopup(true)} buttonText="Edit Progress"/>
export default TaskViewer