import React, { useState } from 'react'
import PropTypes from 'prop-types'

const EventsInit = []

export const EventContext = React.createContext()

export const EventState = ({ children }) => {
  const [event, setEvent] = useState(EventsInit)
  return <EventContext.Provider value={[event, setEvent]}>{children}</EventContext.Provider>
}
EventState.propTypes = {
  children: PropTypes.any.isRequired
}
