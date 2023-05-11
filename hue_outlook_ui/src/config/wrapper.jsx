import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

export const WrapperContext = createContext()

function AppWrapper({ children }) {
  AppWrapper.propTypes = {
    children: PropTypes.any
  }

  const [appConfig, setAppConfig] = useState(null)

  useEffect(() => {
    axios
      .get('https://demo.noerkelit.online:3000/config/keycloak')
      .then((response) => {
        console.log(response.data)
        setAppConfig(response.data)
      })
      .catch((error) => {
        console.error('Fehler beim Laden der Konfigurationsdatei:', error)
      })
  }, [])

  if (appConfig === null) {
    return <></>
  } else {
    return <WrapperContext.Provider value={{ appConfig }}>{children}</WrapperContext.Provider>
  }
}

export default AppWrapper
