import React from 'react'

const Checkbox = (props) => {
    const { value, onChange} = props
  return (
    <>
    <input
    type="checkbox"
    className="checkbox"
    onChange = {onChange}
    checked = {value}
    />
    </>
  )
}

export default Checkbox