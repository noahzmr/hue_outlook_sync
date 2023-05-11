import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  GroupState,
  LampsState,
  ScenesState,
  SensorState,
  QueryState
} from './hue/functions/context'
import { EventState } from './calendar/function/context'
import { SyncState } from './sync/functions/context'
import { KeycloakAuth } from './keycloak/keycloak'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/browser'
import AppWrapper from './config/wrapper'

Sentry.init({
  dsn: '<YOUR SENTRY DSN>',
  integrations: [new BrowserTracing()],
  // environment:
  //   location.hostname === 'localhost' ||
  //   location.hostname === '127.0.0.1' ||
  //   location.hostname === 'demo.noerkelit.online'
  //     ? 'Development'
  //     : 'Production',
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppWrapper>
    <Router>
      <KeycloakAuth>
        <GroupState>
          <LampsState>
            <ScenesState>
              <SensorState>
                <QueryState>
                  <EventState>
                    <SyncState>
                      <App />
                    </SyncState>
                  </EventState>
                </QueryState>
              </SensorState>
            </ScenesState>
          </LampsState>
        </GroupState>
      </KeycloakAuth>
    </Router>
  </AppWrapper>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
