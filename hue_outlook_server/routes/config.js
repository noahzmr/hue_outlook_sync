const express = require('express')
const router = express.Router()
const config = require('../config/config')
const keycloak = require('../config/keycloak')
const fs = require('fs')
const path = require('path')
const configPath = path.join(__dirname, '../config/config.js')
const homePath = path.join(__dirname, '../')
const { spawn } = require('child_process')

const updateConfig = (config, req, type) => {
  console.log(type)
  if (type === 'KC') {
    return new Promise((resolve, reject) => {
      if (!!req.body.keycloak) {
        reject(new Error('Missing required fields in request body.'))
      }

      config.azure.TENANT_ID = req.body.azure.TENANT_ID
      config.azure.CLIENT_ID = req.body.azure.CLIENT_ID
      config.azure.CLIENT_SECRET = req.body.azure.CLIENT_SECRET
      config.hue.HUE_IP = req.body.hue.HUE_IP
      config.hue.HUE_USER = req.body.hue.HUE_USER
      config.hue.HUE_NAME = req.body.hue.HUE_NAME
      // Update Keycloak Values
      if (req.body.keycloak) {
        if (
          !req.body.keycloak.KC_URL ||
          !req.body.keycloak.KC_REALM ||
          !req.body.keycloak.KC_CLIENT ||
          !req.body.keycloak.KC_SSL ||
          !req.body.keycloak.KC_PUBLIC_CLIENT ||
          !req.body.keycloak.KC_PORT ||
          !req.body.keycloak.KC_RESPONSE_MODE ||
          !req.body.keycloak.KC_FLOW ||
          !req.body.keycloak.KC_ENABLE_LOGGING
        ) {
          reject(new Error('Missing required fields in Keycloak object.'))
        } else {
          config.keycloak.KC_URL = req.body.keycloak.KC_URL
          config.keycloak.KC_REALM = req.body.keycloak.KC_REALM
          config.keycloak.KC_CLIENT = req.body.keycloak.KC_CLIENT
          config.keycloak.KC_SSL = req.body.keycloak.KC_SSL
          config.keycloak.KC_PUBLIC_CLIENT = req.body.keycloak.KC_PUBLIC_CLIENT
          config.keycloak.KC_PORT = req.body.keycloak.KC_PORT
          config.keycloak.KC_RESPONSE_MODE = req.body.keycloak.KC_RESPONSE_MODE
          config.keycloak.KC_FLOW = req.body.keycloak.KC_FLOW
          config.keycloak.KC_ENABLE_LOGGING = req.body.keycloak.KC_ENABLE_LOGGING
        }
      }

      // Write updated config to file
      fs.writeFile(configPath, `module.exports = ${JSON.stringify(config, null, 2)}`, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(config)
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      if (!req.body.azure || !req.body.keycloak || !req.body.hue) {
        reject(new Error('Missing required fields in request body.'))
      }

      // Update Azure Values
      if (req.body.azure) {
        if (
          !req.body.azure.TENANT_ID ||
          !req.body.azure.CLIENT_ID ||
          !req.body.azure.CLIENT_SECRET
        ) {
          reject(new Error('Missing required fields in Azure object.'))
        } else {
          config.azure.TENANT_ID = req.body.azure.TENANT_ID
          config.azure.CLIENT_ID = req.body.azure.CLIENT_ID
          config.azure.CLIENT_SECRET = req.body.azure.CLIENT_SECRET
        }
      }

      // Update Keycloak Values
      if (req.body.keycloak) {
        if (
          !req.body.keycloak.KC_URL ||
          !req.body.keycloak.KC_REALM ||
          !req.body.keycloak.KC_CLIENT ||
          !req.body.keycloak.KC_SSL ||
          !req.body.keycloak.KC_PUBLIC_CLIENT ||
          !req.body.keycloak.KC_PORT
        ) {
          reject(new Error('Missing required fields in Keycloak object.'))
        } else {
          config.keycloak.KC_URL = req.body.keycloak.KC_URL
          config.keycloak.KC_REALM = req.body.keycloak.KC_REALM
          config.keycloak.KC_CLIENT = req.body.keycloak.KC_CLIENT
          config.keycloak.KC_SSL = req.body.keycloak.KC_SSL
          config.keycloak.KC_PUBLIC_CLIENT = req.body.keycloak.KC_PUBLIC_CLIENT
          config.keycloak.KC_PORT = req.body.keycloak.KC_PORT
        }
      }

      // Update Hue Values
      if (req.body.hue) {
        if (!req.body.hue.HUE_IP || !req.body.hue.HUE_USER || !req.body.hue.HUE_NAME) {
          reject(new Error('Missing required fields in Hue object.'))
        } else {
          config.hue.HUE_IP = req.body.hue.HUE_IP
          config.hue.HUE_USER = req.body.hue.HUE_USER
          config.hue.HUE_NAME = req.body.hue.HUE_NAME
        }
      }
      // Write updated config to file
      fs.writeFile(configPath, `module.exports = ${JSON.stringify(config, null, 2)}`, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(config)
        }
      })
    })
  }
}

const areAllKeysEmpty = (req, res, next) => {
  const CheckAzure = () => {
    if (
      config.azure.TENANT_ID === '' ||
      config.azure.CLIENT_ID === '' ||
      config.azure.CLIENT_SECRET === ''
    ) {
      return false
    } else {
      return true
    }
  }
  const CheckKeycloak = () => {
    if (
      config.keycloak.KC_URL === '' ||
      config.keycloak.KC_REALM === '' ||
      config.keycloak.KC_CLIENT === '' ||
      config.keycloak.KC_SSL === '' ||
      config.keycloak.KC_PUBLIC_CLIENT == '' ||
      config.keycloak.KC_PORT == '' ||
      config.keycloak.KC_RESPONSE_MODE === '' ||
      config.keycloak.KC_FLOW === '' ||
      config.keycloak.KC_ENABLE_LOGGING == ''
    ) {
      return false
    } else {
      return true
    }
  }
  const CheckHue = () => {
    if (config.hue.HUE_IP === '' || config.hue.HUE_USER === '' || config.hue.HUE_NAME === '') {
      return false
    } else {
      return true
    }
  }
  console.log('Allow to Update', { azure: CheckAzure(), hue: CheckHue(), kc: CheckKeycloak() })

  const url = '/'
  if (CheckKeycloak() && CheckHue() && CheckAzure()) {
    res.redirect(url)
    return false
  } else if (!CheckKeycloak() && CheckHue() && CheckAzure()) {
    next()
    return true
  } else if (CheckKeycloak() && !CheckHue() && !CheckAzure()) {
    res.redirect(url)
    return false
  } else {
    next()
    return true
  }
}

const restartServer = () => {
  const npmPath = '/home/noerkel/.nvm/versions/node/v20.1.0/bin/npm'
  const npm = spawn(npmPath, ['run', 'start'], {
    detached: true,
    stdio: 'ignore',
    cwd: homePath,
    env: { PATH: '/usr/local/bin:/usr/bin:/bin:' + npmPath }
  })
  npm.unref()
  process.exit()
}

router.get('/', keycloak.protect('realm:hue_outlook_sync_admin'), (req, res) => {
  res.send(config)
  restartServer()
})

router.post('/', keycloak.protect('realm:hue_outlook_sync_admin'), (req, res) => {
  updateConfig(config, req, '')
    .then((config) => {
      console.log('Config successfully updated:', config)
      restartServer()
      res.send('Updated. Restart Server!')
    })
    .catch((error) => {
      console.error('Error updating config:', error.message)
      res.send(error.message)
    })
})

router.get('/setup', areAllKeysEmpty, (req, res) => {
  res.render('edit')
})
router.post('/setup', areAllKeysEmpty, (req, res) => {
  const values = {
    body: {
      azure: {
        TENANT_ID: '',
        CLIENT_ID: '',
        CLIENT_SECRET: ''
      },
      hue: {
        HUE_IP: '',
        HUE_USER: '',
        HUE_NAME: ''
      },
      keycloak: {
        KC_URL: req.body.url,
        KC_REALM: req.body.realm,
        KC_CLIENT: req.body.client,
        KC_SSL: req.body.ssl,
        KC_PUBLIC_CLIENT: req.body.public,
        KC_PORT: req.body.port,
        KC_RESPONSE_MODE: req.body.responseMode,
        KC_FLOW: req.body.flow,
        KC_ENABLE_LOGGING: req.body.enableLogging
      }
    }
  }
  console.log(values)
  updateConfig(config, values, 'KC')
    .then((config) => {
      console.log('Config successfully updated:', config)
      restartServer()
      res.send('Updated. Restart Server!')
    })
    .catch((error) => {
      console.error('Error updating config:', error.message)
      res.send(error.message)
    })
})
router.get('/keycloak', (req, res) => {
  console.log(config.keycloak)
  res.send(config.keycloak)
})

module.exports = router
