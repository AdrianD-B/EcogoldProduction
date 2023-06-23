import React from 'react'
import ButtonComponent from '../components/ButtonComponent'
import FormInput from '../components/FormInput';

const data = [
  { name: "Adrian", model: 22, colour: "black", size: "large", quantity: 2, task: "cutting", progress: "0" },
  { name: "Roméo", model: 25, colour: "blue", size: "XL", quantity: 1, task: "packing", progress: "5/12" }
]

function TaskCreator() {


  return (
    <div className='taskviewer-container'>

      <h2> TaskCreator </h2>
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
              <td><input
                name="name"
                value={val.progress}
                type="string"
                placeholder='0'
                
              /></td>
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
    </div >

  )
}

export default TaskCreator