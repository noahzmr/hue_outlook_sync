import React, { useEffect, useContext } from 'react'
import { GroupContext, LampsContext, ScenesContext, SensorsContext } from '../context'
import { GetGroups, GetLamps, GetScenes, GetSensors } from './get'
import { GetEvents } from '../../../calendar/function/getEvents'
import { EventContext } from '../../../calendar/function/context'
import { GetSync } from '../../../sync/functions/get'
import { SyncContext } from '../../../sync/functions/context'
import { KeycloakContext } from '../../../keycloak/keycloak'
import { useNavigate } from 'react-router-dom'

export default function GetAll() {
  // Hue Values
  /* eslint-disable no-unused-vars */
  const [lamp, setLamp] = useContext(LampsContext)
  const [groups, setGroups] = useContext(GroupContext)
  const [scenes, setScenes] = useContext(ScenesContext)
  const [sensors, setSensors] = useContext(SensorsContext)
  const [event, setEvent] = useContext(EventContext)
  const [syncs, setSyncs] = useContext(SyncContext)
  /* eslint-enable no-unused-vars */
  const profile = useContext(KeycloakContext)
  const email = profile.profile.email
  const navigate = useNavigate()

  // Calendar Values
  useEffect(() => {
    GetGroups()
      .then((value) => {
        setGroups(value)
      })
      .catch((err) => {
        console.log(err)
      })
    GetLamps()
      .then((value) => {
        setLamp(value)
      })
      .catch((err) => {
        alert(err)
      })
    GetScenes()
      .then((value) => {
        setScenes(value)
      })
      .catch((err) => {
        console.log(err)
      })
    GetSensors()
      .then((value) => {
        console.log('sensors', value)
        setSensors(value)
      })
      .catch((err) => {
        console.log(err)
      })
    GetEvents(email)
      .then((value) => {
        console.log('Events Context', value)
        if (value.status === 404) {
          navigate('error/config')
        } else {
          if (Object.keys(value).length === 0 || Object.keys(value) == '{}') {
            console.log('Events Context Empty')
            setEvent([])
          } else {
            console.log('Events Context with stuff')
            setEvent(value)
          }
        }
      })
      .catch((err) => {
        alert('ERR')
        console.log(err)
      })
    GetSync()
      .then((value) => {
        console.log('Syncs', value)
        setSyncs(value)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return <></>
}
