import React, { useState } from 'react'
import PropTypes from 'prop-types'

const GroupInit = []
const LampInit = []
const ScenesInit = []
const SensorsInit = []

export const GroupContextFilterd = React.createContext()
export const LampsContextFilterd = React.createContext()
export const ScenesContextFilterd = React.createContext()
export const SensorsContextFilterd = React.createContext()

export const GroupState = ({ children }) => {
  const [group, setGroup] = useState(GroupInit)
  return (
    <GroupContextFilterd.Provider value={[group, setGroup]}>
      {children}
    </GroupContextFilterd.Provider>
  )
}
export const LampsState = ({ children }) => {
  const [lamp, setLamp] = useState(LampInit)
  return (
    <LampsContextFilterd.Provider value={[lamp, setLamp]}>{children}</LampsContextFilterd.Provider>
  )
}
export const ScenesState = ({ children }) => {
  const [scenes, setScenes] = useState(ScenesInit)
  return (
    <ScenesContextFilterd.Provider value={[scenes, setScenes]}>
      {children}
    </ScenesContextFilterd.Provider>
  )
}
export const SensorState = ({ children }) => {
  const [sensors, setSensors] = useState(SensorsInit)
  return (
    <SensorsContextFilterd.Provider value={[sensors, setSensors]}>
      {children}
    </SensorsContextFilterd.Provider>
  )
}
GroupState.propTypes = {
  children: PropTypes.any.isRequired
}
LampsState.propTypes = {
  children: PropTypes.any.isRequired
}
ScenesState.propTypes = {
  children: PropTypes.any.isRequired
}
SensorState.propTypes = {
  children: PropTypes.any.isRequired
}
