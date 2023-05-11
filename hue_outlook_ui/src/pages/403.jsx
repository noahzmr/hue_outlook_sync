import React from 'react'
import Logo from '../assets/logo-color.png'
import { useNavigate } from 'react-router-dom'

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div id="notFound">
      <div>
        <h1>
          4<img src={Logo} alt="logo" />3
        </h1>
        <h2>UH OH! We are sorry but,</h2>
        <p>
          you do not have the required authorization to visit this page. Please contact an
          administrator!
        </p>
        <button
          onClick={() => {
            navigate('/')
          }}
          className="btn green">
          HOME
        </button>
      </div>
    </div>
  )
}
