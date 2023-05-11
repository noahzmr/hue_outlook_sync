import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectItem } from '../hue/icons'

export default function ConfigNav() {
  const navigate = useNavigate()

  return (
    <div className="homeItem">
      <div
        className="lampContianer"
        onClick={() => {
          navigate('/ui/config')
        }}>
        {SelectItem('config')}
      </div>
      <div>
        <h3>Config</h3>
        <p>Here you can manage all your settings!</p>
      </div>
    </div>
  )
}
