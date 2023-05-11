const Keycloak = require('keycloak-connect')
const session = require('express-session')
const config = require('./config')

const kcConfig = {
  realm: config.keycloak.KC_REALM,
  'auth-server-url': config.keycloak.KC_URL,
  'ssl-required': config.keycloak.KC_SSL,
  resource: config.keycloak.KC_CLIENT,
  'public-client': config.keycloak.KC_PUBLIC_CLIENT,
  'confidential-port': config.keycloak.KC_PORT
}

const memoryStore = new session.MemoryStore()
const keycloak = new Keycloak({ store: memoryStore }, kcConfig)

module.exports = keycloak
