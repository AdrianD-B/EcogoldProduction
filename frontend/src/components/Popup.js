import React from "react";
import ButtonComponent from "./ButtonComponent";

function Popup(props, popupClass) {
    return (props.trigger) ? (
        <div className={popupClass}>
            <div className="popup-inner">
                <button className="close-button" onClick={() => props.setTrigger(false)}>
                    close</button>
                {props.children}
            </div>
        </div>
    ) : ""
}
/* <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
    
    <ButtonComponent className="close-button" onClick={() => props.setTrigger(false)}>
                    close</ButtonComponent>*/
export default Popup;