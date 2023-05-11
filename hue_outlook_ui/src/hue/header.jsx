import React, { useContext } from 'react'
import { QueryContext } from './functions/context'

export default function HueHeader() {
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useContext(QueryContext)

  return (
    <div>
      <label className="input">
        <input
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          id="about"
          className="input__field"
          type="text"
          placeholder=" "
        />
        <span className="input__label">
          <i className="bi bi-search"></i> Search
        </span>
      </label>
    </div>
  )
}
