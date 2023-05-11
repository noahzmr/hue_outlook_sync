const express = require('express')
const router = express.Router()
const keycloak = require('../config/keycloak')
const path = require('path')
const fileName = path.join(__dirname, '../values/events.json')
const fs = require('fs')
const moment = require('moment-timezone')
const axios = require('axios')

const config = require('../config/config')
const graph = require('@microsoft/microsoft-graph-client')

const GetEvents = (accessToken, email) => {
  const start = moment().tz('Europe/Berlin').format()
  const end = moment().add(7, 'days').tz('Europe/Berlin').format()
  console.log('TIMES: ', end, start)
  const client = graph.Client.init({
    authProvider: (done) => {
      done(null, accessToken)
    }
  })

  let values = []
  return new Promise(async (resolve, reject) => {
    try {
      const result = await client
        .api(`/users/${email}/events?startDateTime=${start}&endDateTime=${end}`)
        .header('Prefer', 'outlook.timezone="Europe/Berlin"')
        .top(10)
        .orderby('start/dateTime DESC')
        .get()

      result.value.forEach((element) => {
        const val = {
          id: element.id,
          title: element.subject,
          allDay: element.isAllDay,
          start: element.start.dateTime,
          end: element.end.dateTime,
          reminde: element.isReminderOn,
          isCancelled: element.isCancelled,
          showAs: element.showAs,
          importance: element.importance,
          sensitivity: element.sensitivity
        }
        values.push(val)
      })
      resolve(values)
      fs.writeFile(
        fileName,
        JSON.stringify(values),
        (writeJSON = (err) => {
          if (err) {
            return console.log(err)
          }
          console.log('writing to ' + fileName)
        })
      )
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

router.get('/:email', keycloak.protect('realm:hue_outlook_sync'), async (req, res, next) => {
  console.log('EMAIL FOR EVENTS:', req.params.email)

  axios
    .post(
      `https://login.microsoftonline.com/${config.azure.TENANT_ID}/oauth2/v2.0/token`,
      `client_id=${config.azure.CLIENT_ID}` +
        '&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default' +
        `&client_secret=${config.azure.CLIENT_SECRET}` +
        '&grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    .then((response) => {
      // handle success
      console.log(response.data)
      GetEvents(response.data.access_token, req.params.email)
        .then((response) => {
          console.log(response)
          res.send(response)
        })
        .catch((err) => {
          console.log(err)
          res.send(err)
        })
    })
    .catch((error) => {
      // handle error
      res.send(error)
      console.log(error)
    })
})

module.exports = router
