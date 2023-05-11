const express = require('express')
const router = express.Router()
const fs = require('fs')
const keycloak = require('../config/keycloak')
const path = require('path')
const fileName = path.join(__dirname, '../values/sync.json')
const moment = require('moment-timezone')
const axios = require('axios')
const config = require('../config/config')
const hueIP = config.hue.HUE_IP
const hueURL = `https://${hueIP}`
const user = config.hue.HUE_USER
const https = require('https')

const AktivateSceneGroup = (scene, group) => {
  console.log(scene, group)
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false
  })
  const value = {
    scene: scene
  }
  axios
    .put(hueURL + `/api/${user}/groups/${group}/action`, value, { httpsAgent })
    .then((response) => {
      console.log(`HUE Change scene: `, response.data)
    })
    .catch((err) => {
      console.log(`HUE Change scene: `, err.message)
    })
}

const setAlarm = (isoString, scene, group) => {
  const eventTime = moment(isoString).toDate()
  const now = moment.tz('Europe/Berlin').toDate()

  if (eventTime < now) {
    console.error('Error: Date is in the past.', {
      eventTime,
      now
    })
    return
  }

  const timeUntilAlarm = eventTime - now

  console.log({
    eventTime,
    now,
    timeUntilAlarm
  })

  setTimeout(function () {
    AktivateSceneGroup(scene, group)
    console.log('Alarm!', {
      event: isoString,
      now: moment.tz('Europe/Berlin').format(),
      timer: timeUntilAlarm
    })
  }, timeUntilAlarm)
}

const Sync = () => {
  let EVENTS = require('../values/events.json')
  const syncArray = require('../values/sync.json')
  console.log('VALUES: ', EVENTS, syncArray)
  console.log('run sync')
  syncArray.forEach((item) => {
    if (item.outlook.search === 'title') {
      const filterdTitle = EVENTS?.filter((value) => {
        return value.title?.toLowerCase().includes(item.outlook.condition.toLowerCase())
      })
      filterdTitle.map((element) => {
        console.log('Set Alarm')
        setAlarm(element.start, item.hue.condition, item.hue.group)
      })
      console.log('Filter for title', filterdTitle.length, item)
    } else if (item.outlook.search === 'status') {
      const filterdStatus = EVENTS?.filter((value) => {
        return value.showAs.toLowerCase().includes(item.outlook.condition.toLowerCase())
      })
      filterdStatus.map((element) => {
        console.log('Set Alarm')
        setAlarm(element.start, item.hue.condition, item.hue.group)
      })
      console.log('Filter for Status', filterdStatus.length, item)
    } else {
      console.log('No Syncs')
      return 'No Syncs'
    }
  })
}

router.post('/', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  const values = req.body
  const syncArray = require('../values/sync.json')
  syncArray.push(values)

  fs.writeFile(
    fileName,
    JSON.stringify(syncArray),
    (writeJSON = (err) => {
      if (err) {
        res.send(err)
        return console.log(err)
      }
      console.log('writing to ' + fileName)
      res.send('add sync')
    })
  )
})
router.get('/', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  const syncArray = require('../values/sync.json')
  res.send(syncArray)
  Sync()
})
router.get('/sync', keycloak.protect('realm:hue_outlook_sync'), (req, res, next) => {
  res.send('Run Sync')
  Sync()
})
module.exports = router
