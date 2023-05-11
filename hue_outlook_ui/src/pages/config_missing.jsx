import React from 'react'
import Logo from '../assets/logo-color.png'
import { useNavigate } from 'react-router-dom'

export default function ConfigMissing() {
  const navigate = useNavigate()
  return (
    <div id="notFound">
      <div>
        <h1>
          5<img src={Logo} alt="logo" />
          <img src={Logo} alt="logo" />
        </h1>
        <h2>Missing conifg</h2>
        <p>
          It seems that not all necessary Phillips Hue and Outlook data are available, please add
          them to the configuration.
        </p>
        <p>If you do not have the required permissions please contact your administrator.</p>
        <button
          onClick={() => {
            navigate('/ui/config')
          }}
          className="btn green">
          Config
        </button>
      </div>
    </div>
  )
}
