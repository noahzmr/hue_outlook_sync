import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectItem } from '../hue/icons'

export default function HomeSyncer() {
  const navigate = useNavigate()

  return (
    <div className="homeItem">
      <div
        className="lampContianer"
        onClick={() => {
          navigate('/ui/syncer')
        }}>
        {SelectItem('sync')}
      </div>
      <div>
        <h3>Sync</h3>
        <p>
          Here you can view your Outlook calendar entries and use them to control your Hue lights.
          With this feature, you can see your daily activities at a glance and prepare your home
          accordingly. For example, you can set the lights to come on automatically when you have an
          appointment or are approaching a certain time. All you have to do is link your Outlook
          calendars to our system and make the appropriate settings. Once this is done, you can
          automate the control of your Hue lights and focus on your daily tasks. We hope you will
          find this feature useful and look forward to helping you make your home even more
          comfortable.
        </p>
      </div>
    </div>
  )
}
