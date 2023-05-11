require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const debug = require('debug')('backend:server')
const cors = require('cors')
const keycloak = require('./config/keycloak')

const https = require('https')
const fs = require('fs')

const config = require('./config/config')

const calendarRouter = require('./routes/calendar')
const hueRouter = require('./routes/hue')
const syncRouter = require('./routes/sync')
const configRouter = require('./routes/config')

const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log(
    `You can visit the site under https://demo.noerkelit.online:${port} or https://localhost:${3000}`
  )
}

const port = normalizePort('3000')

const origin = [
  "https://demo.noerkelit.online:3001/' ",
  "https://demo.noerkelit.online:3001' ",
  "https://demo.noerkelit.online:3001*' ",
  'https://keycloak.noerkelit.online*',
  'https://keycloak.noerkelit.online'
]

// initialize express
const app = express()

app.use(
  session({
    secret: config.express.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true
    }
  })
)

/*
Initilaz Node.js Server
*/
const server = https.createServer(
  {
    key: fs.readFileSync('cert/key.key'),
    cert: fs.readFileSync('cert/cert.cer')
  },
  app
)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors())
app.use(keycloak.middleware())

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/calendar', calendarRouter)
app.use('/hue', hueRouter)
app.use('/sync', syncRouter)
app.use('/config', configRouter)

// Handles any requests that don't match the ones above
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app
