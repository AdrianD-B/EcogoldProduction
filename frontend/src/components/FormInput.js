import React from 'react'

function FormInput({inputClass,inputType='text',header}) {
    return (
        <div className={inputClass}>
            <p>{header}</p>
            <input type={inputType} required />
        </div>
    )
}

export default FormInput