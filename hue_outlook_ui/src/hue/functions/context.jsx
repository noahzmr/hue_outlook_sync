import React, { useState } from 'react'
import PropTypes from 'prop-types'

const GroupInit = []
const LampInit = []
const ScenesInit = []
const SensorsInit = []
const QueryInit = ''

export const GroupContext = React.createContext()
export const LampsContext = React.createContext()
export const ScenesContext = React.createContext()
export const SensorsContext = React.createContext()
export const QueryContext = React.createContext()

export const GroupState = ({ children }) => {
  const [group, setGroup] = useState(GroupInit)
  return <GroupContext.Provider value={[group, setGroup]}>{children}</GroupContext.Provider>
}
export const LampsState = ({ children }) => {
  const [lamp, setLamp] = useState(LampInit)
  return <LampsContext.Provider value={[lamp, setLamp]}>{children}</LampsContext.Provider>
}
export const ScenesState = ({ children }) => {
  const [scenes, setScenes] = useState(ScenesInit)
  return <ScenesContext.Provider value={[scenes, setScenes]}>{children}</ScenesContext.Provider>
}
export const SensorState = ({ children }) => {
  const [sensors, setSensors] = useState(SensorsInit)
  return <SensorsContext.Provider value={[sensors, setSensors]}>{children}</SensorsContext.Provider>
}
export const QueryState = ({ children }) => {
  const [query, setQuery] = useState(QueryInit)
  return <QueryContext.Provider value={[query, setQuery]}>{children}</QueryContext.Provider>
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
QueryState.propTypes = {
  children: PropTypes.any.isRequired
}
