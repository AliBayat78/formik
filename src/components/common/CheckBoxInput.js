import React from 'react'

const CheckboxInput = ({ formik, name, checkBoxOptions }) => {
  return (
    <div className="form-control">
      {checkBoxOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            checked={formik.values[name].includes(item.value)} // ["React", "vue"]
            type="checkbox"
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

export default CheckboxInput
