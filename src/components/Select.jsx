import React from "react";

// Reusable Select component as an arrow function
const Select = ({ 
  label, 
  id, 
  name, 
  value, 
  onChange, 
  options 
}) => {
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <select 
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
