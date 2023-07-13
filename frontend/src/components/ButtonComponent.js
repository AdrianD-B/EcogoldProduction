import React, {useState} from 'react'

function ButtonComponent({buttonClass, buttonText, onClick, noChev=false}) {
    const [active, setActive] = useState(false)
    const getChevronClassName = () => {
        if (active) return "chevron-arrow-right";
        else return "";
    }
    return ( 
    <div className={buttonClass} onClick={onClick} onMouseOver={()=>setActive(true)} onMouseOut={()=>setActive(false)}> 
    <h3> {buttonText} </h3>
    {!noChev ? <div className={getChevronClassName()}/> : null}
    </div>
  )
}

export default ButtonComponent