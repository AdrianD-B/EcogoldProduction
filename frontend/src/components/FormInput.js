import React from "react";

function FormInput({
  inputClass,
  inputType = "text",
  header,
  onChange,
  value,
}) {
  return (
    <div className={inputClass}>
      <h4>{header}</h4>
      <input
        onChange={onChange}
        value={value}
        name={header.toLowerCase()}
        className="form-input"
        type={inputType}
        required
      />
    </div>
  );
}

export default FormInput;
