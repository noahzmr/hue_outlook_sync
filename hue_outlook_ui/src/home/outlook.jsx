import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectItem } from '../hue/icons'

export default function HomeOutlook() {
  const navigate = useNavigate()

  return (
    <div className="homeItem">
      <div
        className="lampContianer"
        onClick={() => {
          navigate('/ui/calendar')
        }}>
        {SelectItem('outlook')}
      </div>
      <div>
        <h3>Outlook</h3>
        <p>Here you can see all your Events</p>
      </div>
    </div>
  )
}
