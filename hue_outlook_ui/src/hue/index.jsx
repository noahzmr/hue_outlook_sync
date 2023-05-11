import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SelectItem } from './icons'
import HueHeader from './header'
import { KeycloakContext } from '../keycloak/keycloak'

export default function Hue() {
  const profile = useContext(KeycloakContext)
  const [lamps, setLamps] = useState('lampContianer')
  const [groups, setGroups] = useState('lampContianer')
  const [rules, setRules] = useState('lampContianer')
  const [scenes, setScenes] = useState('lampContianer')
  const [sensors, setSensors] = useState('lampContianer')
  const navigate = useNavigate()

  const changeValue = (path, element) => {
    if (path !== undefined) {
      navigate(path)
    }
    if (element === 'lamps') {
      setLamps('lampContianer primary')
      setGroups('lampContianer')
      setScenes('lampContianer')
      setSensors('lampContianer')
    } else if (element === 'groups') {
      setLamps('lampContianer')
      setGroups('lampContianer primary')
      setScenes('lampContianer')
      setSensors('lampContianer')
    } else if (element === 'scenes') {
      setLamps('lampContianer')
      setGroups('lampContianer')
      setScenes('lampContianer primary')
      setSensors('lampContianer')
    } else if (element === 'sensors') {
      setLamps('lampContianer')
      setGroups('lampContianer')
      setScenes('lampContianer')
      setSensors('lampContianer primary')
    }
  }

  useEffect(() => {
    changeValue(undefined, window.location.pathname.split('/')[2])
    console.log(profile)
  }, [])
  return (
    <div>
      <div className="hue">
        <h2>
          Hello {profile.profile.firstName} {profile.profile.lastName} here you will find all your
          Hue stuff!
        </h2>
        <HueHeader />
        <br />
        <div className="lamps">
          <div
            id="lamps"
            onClick={() => {
              changeValue('/ui/hue/lamps', 'lamps')
            }}
            className={lamps}>
            <p className="name">Lamps</p>
            {SelectItem('BulbsSultan')}
          </div>
          <div
            onClick={() => {
              changeValue('/ui/hue/groups', 'groups')
            }}
            className={groups}>
            <p className="name">Groups</p>
            {SelectItem('BulbGroup')}
          </div>
          <div
            onClick={() => {
              changeValue('/ui/hue/scenes', 'scenes')
            }}
            className={scenes}>
            <p className="name">Scenes</p>
            {SelectItem('UicontrolsScenes')}
          </div>
          <div
            onClick={() => {
              changeValue('/ui/hue/sensors', 'sensors')
            }}
            className={sensors}>
            <p className="name">Devices</p>
            {SelectItem('DevicesMotionSensor')}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
