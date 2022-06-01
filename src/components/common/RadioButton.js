import React from 'react'

const RadioButton = ({ formik, name, radioOptions }) => {
  return (
    <div className="form-control">
      {radioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            checked={formik.values[name] === item.value}
            type="radio"
            name={name}
            value={item.value}
            id={item.value}
            onChange={formik.handleChange}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  )
}

export default RadioButton
