import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { KeycloakContext } from './keycloak'
import PropTypes from 'prop-types'

const checkRole = (roles, role) => {
  console.warn('ROLES: ', roles, role, roles.includes(role[0]) || roles.includes(role[1]))
  return roles.includes(role[0]) || roles.includes(role[1])
}

const PrivateRoute = ({ component: Component, roles }) => {
  PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    roles: PropTypes.any.isRequired
  }

  const kcContext = useContext(KeycloakContext)
  const kc = kcContext.keycloak
  const realmAccess = kc.realmAccess.roles
  if (kc.authenticated && checkRole(realmAccess, roles)) {
    return Component
  } else {
    return <Navigate to={{ pathname: '/403' }} />
  }
}

export default PrivateRoute
