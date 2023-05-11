import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SyncInit = []

export const SyncContext = React.createContext()

export const SyncState = ({ children }) => {
  const [syncs, setSyncs] = useState(SyncInit)
  return <SyncContext.Provider value={[syncs, setSyncs]}>{children}</SyncContext.Provider>
}
SyncState.propTypes = {
  children: PropTypes.any.isRequired
}
