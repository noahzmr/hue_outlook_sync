const express = require('express')
const router = express.Router()
const axios = require('axios')
const https = require('https')
const keycloak = require('../config/keycloak')
const config = require('../config/config')
const hueIP = config.hue.HUE_IP
const hueURL = `https://${hueIP}`
const user = config.hue.HUE_USER

/*
-#-#-#-#- HUE RESSOURCES -#-#-#-#- 
/lights resource which contains all the light resources
/groups resource which contains all the groups
/config resource which contains all the configuration items
/schedules which contains all the schedules
/scenes which contains all the scenes
/sensors which contains all the sensors
/rules which contains all the rules
*/

const hueAxios = async (methode, url, value) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false
  })
  return new Promise((resolve, reject) => {
    if (methode === 'get') {
      axios
        .get(hueURL + url, { httpsAgent })
        .then((response) => {
          console.log(`HUE axios ${url}: `, response.data)
          resolve(response.data)
        })
        .catch((err) => {
          console.log(`HUE axios error ${url}: `, err.message)
          reject(err.message)
        })
    } else if (methode === 'post') {
      axios
        .post(hueURL + url, value, { httpsAgent })
        .then((response) => {
          console.log(`HUE axios ${url}: `, response.data)
          resolve(response.data)
        })
        .catch((err) => {
          console.log(`HUE axios error ${url}: `, err.message)
          reject(err.message)
        })
    } else if (methode === 'put') {
      axios
        .put(hueURL + url, value, { httpsAgent })
        .then((response) => {
          console.log(`HUE axios ${url}: `, response.data)
          resolve(response.data)
        })
        .catch((err) => {
          console.log(`HUE axios error ${url}: `, err.message)
          reject(err.message)
        })
    }
  })
}

const createHueDeveloper = (ip, appName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        devicetype: appName
      }
      const response = await axios.post(`http://${ip}/api`, body)
      if (response.data[0].error) {
        console.log(response.data[0].error.description)
        reject(response.data[0].error.description)
      } else {
        const username = response.data[0].success.username
        console.log(`Success! Created developer with username: ${username}`)
        resolve(username)
      }
    } catch (error) {
      console.error(`Failed to create developer: ${error}`)
      reject(error)
    }
  })
}

const getLamps = () => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/lights`)
      .then((response) => {
        console.log(`Found ${response.element} devices`)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const getLamp = (id) => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/lights/${id}`)
      .then((response) => {
        console.log(`Found ${response.element} devices`)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const turnLigthOnOff = (id, value) => {
  return new Promise((resolve, reject) => {
    hueAxios(
      'put',
      `/api/${user}/lights/${id}/state`,
      value === 'true' ? { on: true } : { on: false }
    )
      .then((response) => {
        getLamps()
          .then((response) => {})
          .catch((err) => {
            console.log(err)
          })
        console.log(response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const changeState = (id, value) => {
  console.log(id, value)
  return new Promise((resolve, reject) => {
    hueAxios('put', `/api/${user}/lights/${id}/state`, { xy: value })
      .then((response) => {
        console.log(response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const changeStateBrigthness = (id, value) => {
  console.log({ id: id, value: value })
  return new Promise((resolve, reject) => {
    hueAxios('put', `/api/${user}/lights/${id}/state`, { bri: parseInt(value) })
      .then((response) => {
        console.log(response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const getGroups = () => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/groups`)
      .then((response) => {
        console.log(`Found Groups: `, response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const getGroup = (id) => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/groups/${id}`)
      .then((response) => {
        console.log(`Found Groups: `, response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getConfig = () => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/config`)
      .then((response) => {
        console.log(`Found Config: `, response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getSchedules = () => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/schedules`)
      .then((response) => {
        console.log(`Found schedules: `, response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getScenes = () => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/scenes`)
      .then((response) => {
        console.log(`Found scenes: `, response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getSensors = () => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/sensors`)
      .then((response) => {
        console.log(`Found sensors: `, response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getRules = () => {
  return new Promise((resolve, reject) => {
    hueAxios('get', `/api/${user}/rules`)
      .then((response) => {
        console.log(`Found rules: `, response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

router.get('/:id/on/:value', keycloak.protect('realm:hue_outlook_sync'), (req, res) => {
  turnLigthOnOff(req.params.id, req.params.value)
    .then((response) => {
      console.log(`Change the light with the id: ${req.params.id}`)
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})

router.get(
  '/registerDevice/:ip/:name',
  keycloak.protect('realm:hue_outlook_sync_admin'),
  (req, res, next) => {
    createHueDeveloper(req.params.ip, req.params.name)
      .then((response) => {
        console.log(response)
        res.send(response)
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
      })
  }
)
router.get('/lamps', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getLamps()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})
router.get('/lamp/:id', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getLamp(req.params.id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})
router.put('/lamp/:id/color', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  changeState(req.params.id, req.body)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})
router.put('/lamp/:id/brigthness', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  changeStateBrigthness(req.params.id, req.body.bri)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})
router.get('/groups', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getGroups()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})
router.get('/group/:id', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getGroup(req.params.id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})
router.get('/config', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getConfig()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})
router.get('/schedules', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getSchedules()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})
router.get('/scenes', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getScenes()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})
router.get('/sensors', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getSensors()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})
router.get('/rules', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  getRules()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = router
