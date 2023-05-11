import React, { useState, useEffect, useCallback, useMemo, createContext, useContext } from 'react'
import Keycloak from 'keycloak-js'
import * as Sentry from '@sentry/react'
import PropTypes from 'prop-types'
import { WrapperContext } from '../config/wrapper'

export const KeycloakContext = createContext()

export const KeycloakAuth = ({ children }) => {
  KeycloakAuth.propTypes = {
    children: PropTypes.any
  }
  const [profile, _setProfile] = useState()
  const settings = useContext(WrapperContext)?.appConfig

  const setUserInfo = (info) => {
    console.log(info)
    if (info) {
      Sentry.setUser(info)
      Sentry.captureMessage('Session started')
      console.log('userInfo', info)
      _setProfile(info)
    } else {
      Sentry.setUser(null)
      _setProfile(undefined)
    }
  }
  const setProfile = useCallback((profile) => {
    const merged = profile ? { ...profile } : null
    if (merged) {
      delete merged.userProfileMetadata
      delete merged.attributes
      setUserInfo(merged)
    } else {
      setUserInfo(undefined)
    }
  }, [])

  const keycloak = useMemo(() => {
    const keycloak = new Keycloak({
      realm: settings?.KC_REALM,
      url: settings?.KC_URL,
      clientId: settings?.KC_CLIENT
    })
    keycloak.onAuthSuccess = () => {
      console.debug('keycloak', 'Auth Success')
    }

    keycloak.onAuthError = (errorData) => {
      console.warn('keycloak', JSON.stringify(errorData))
    }
    keycloak.onTokenExpired = () => {
      console.debug('keycloak', 'Access token expired.')
    }

    keycloak.onActionUpdate = (status) => {
      switch (status) {
        case 'success':
          console.debug('keycloak', 'Action completed successfully')
          break
        case 'cancelled':
          console.debug('keycloak', 'Action cancelled by user')
          break
        case 'error':
          console.debug('keycloak', 'Action failed')
          break
      }
    }
    return keycloak
  }, [])

  const loadProfile = useCallback(() => {
    keycloak
      .loadUserProfile()
      .then((profile) => {
        console.warn('[Keycloak] Profile values and token: ', profile, keycloak.realmAccess)
        setProfile(profile)
      })
      .catch(() => {
        console.log('Failed to load profile')
        setProfile(undefined)
      })
  }, [keycloak, setProfile])

  useEffect(() => {
    keycloak
      .init({
        responseMode: settings?.KC_RESPONSE_MODE,
        flow: settings?.KC_FLOW,
        enableLogging: settings?.KC_ENABLE_LOGGING
      })
      .then(async (authenticated) => {
        console.debug('authenticated: ', authenticated)
        console.debug(
          'Init Success (' + (authenticated ? 'Authenticated' : 'Not Authenticated') + ')'
        )
        if (authenticated) {
          loadProfile()
          localStorage.setItem('key', keycloak.token)
        } else {
          await keycloak.login()
        }
      })
      .catch((err) => {
        setProfile(undefined)
        console.log(err)
      })
  }, [keycloak, loadProfile, setProfile, settings])

  if (profile !== undefined) {
    return (
      <KeycloakContext.Provider value={{ profile, keycloak }}>{children}</KeycloakContext.Provider>
    )
  }

  return <></>
}
