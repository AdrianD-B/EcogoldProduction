import React, { useState } from 'react'
import ButtonComponent from '../components/ButtonComponent'
import Popup from '../components/Popup'
import FormInput from '../components/FormInput';

const data = [
  { model: 22, colour: "black", size: "large", quantity: 2, task: "cutting", progress: "0" }
]

function TaskViewerUser() {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className='taskviewer-container'>
      
      <h2> TaskViewer </h2>
      <table>
        <tr>
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
      <button className="progress-button" onClick={() => setButtonPopup(true)}>Edit Progress</button>

    <Popup className="popup-progress" trigger={buttonPopup} setTrigger={setButtonPopup}>
      <p>Enter Progress</p>
      <FormInput inputClass="login-form-item" inputType="number"/>
      <ButtonComponent buttonClass="enter-button" type="submit" buttonText={"Enter"}/>
    </Popup>
    </div >
  )
}
//<ButtonComponent buttonClass="progress-button" onClick={() => setButtonPopup(true)} buttonText="Edit Progress"/>
export default TaskViewerUser