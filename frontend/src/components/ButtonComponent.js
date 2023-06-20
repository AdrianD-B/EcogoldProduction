import React, {useState} from 'react'

function ButtonComponent({buttonClass, buttonText}) {
    const [active, setactive] = useState(false)
    const getChevronClassName = () => {
        if (active) return "chevron-arrow-right";
        else return "";
    }
    return ( 
    <div className={buttonClass} onMouseOver={()=>setactive(true)} onMouseOut={()=>setactive(false)}> 
    <h3> {buttonText} </h3>
    <div className={getChevronClassName()}/>
    </div>
  )
}

export default ButtonComponent