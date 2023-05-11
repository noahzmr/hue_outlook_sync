import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectItem } from '../hue/icons'

export default function HomeHue() {
  const navigate = useNavigate()

  return (
    <div className="homeItem">
      <div
        className="lampContianer"
        onClick={() => {
          navigate('/ui/hue')
        }}>
        {SelectItem('bridge')}
      </div>
      <div>
        <h3>Hue</h3>
        <p>
          Here you can find all your Hue lamps, scenes, groups and connected devices. You can also
          control the lights over it!
        </p>
      </div>
    </div>
  )
}
