import React, { useState } from 'react'
import OutllokSync from './outlook'
function Create() {
  const [name, setName] = useState('')

  return (
    <div className="detailBackground">
      <div className="create">
        <label className="input">
          <input
            onChange={(e) => {
              setName(e.target.value)
            }}
            id="about"
            className="input__field"
            type="text"
            placeholder=" "
          />
          <span className="input__label">Name</span>
        </label>
        {name !== '' ? <OutllokSync syncName={name} /> : <></>}
      </div>
    </div>
  )
}

export default Create
