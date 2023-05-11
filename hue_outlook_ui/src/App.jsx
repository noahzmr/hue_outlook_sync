import React from 'react'
import './style/App.css'
import { Route, Routes } from 'react-router-dom'
import Calendar from './calendar/index'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './home'
import Hue from './hue'
import Groups from './hue/groups'
import Lamps from './hue/lamps'
import Scenes from './hue/scenes'
import Sensors from './hue/sensors'
import GetAll from './hue/functions/load/loadAll'
import LampDetail from './hue/lamps/detail'
import Syncer from './sync/index'
import Create from './sync/create'
import Header from './home/header'
import Config from './config'
import NotFoundError from './pages/404'
import Unauthorized from './pages/403'
import PrivateRoute from './keycloak/access'
import ConfigMissing from './pages/config_missing'

export default function App() {
  return (
    <div>
      <Header />
      <GetAll />
      <div style={{ marginTop: '80px' }}>
        <Routes>
          <Route
            path="/ui/config"
            element={
              <PrivateRoute
                exact
                path="/ui/config"
                component={<Config />}
                roles={['hue_outlook_sync_admin']}
              />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                exact
                path="/"
                component={<Home />}
                roles={['hue_outlook_sync', 'hue_outlook_sync_admin']}
              />
            }
          />
          <Route
            path="/ui/calendar"
            element={
              <PrivateRoute
                exact
                path="/ui/calendar"
                component={<Calendar />}
                roles={['hue_outlook_sync']}
              />
            }
          />
          <Route
            path="/ui/syncer"
            element={
              <PrivateRoute
                exact
                path="/ui/syncer"
                component={<Syncer />}
                roles={['hue_outlook_sync']}
              />
            }>
            <Route
              path="/ui/syncer/create"
              element={
                <PrivateRoute
                  exact
                  path="/ui/syncer/create"
                  component={<Create />}
                  roles={['hue_outlook_sync']}
                />
              }
            />
          </Route>
          <Route
            path="/ui/hue"
            element={
              <PrivateRoute exact path="/ui/hue" component={<Hue />} roles={['hue_outlook_sync']} />
            }>
            <Route
              path="/ui/hue/lamps"
              element={
                <PrivateRoute
                  exact
                  path="/ui/hue/lamps"
                  component={<Lamps />}
                  roles={['hue_outlook_sync']}
                />
              }>
              <Route
                path="/ui/hue/lamps/:id"
                element={
                  <PrivateRoute
                    exact
                    path="/ui/hue/lamps/:id"
                    component={<LampDetail />}
                    roles={['hue_outlook_sync']}
                  />
                }
              />
            </Route>
            <Route
              path="/ui/hue/groups"
              element={
                <PrivateRoute
                  exact
                  path="/ui/hue/groups"
                  component={<Groups />}
                  roles={['hue_outlook_sync']}
                />
              }
            />
            <Route
              path="/ui/hue/scenes"
              element={
                <PrivateRoute
                  exact
                  path="/ui/hue/scenes"
                  component={<Scenes />}
                  roles={['hue_outlook_sync']}
                />
              }
            />
            <Route
              path="/ui/hue/sensors"
              element={
                <PrivateRoute
                  exact
                  path="/ui/hue/sensors"
                  component={<Sensors />}
                  roles={['hue_outlook_sync']}
                />
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <PrivateRoute
                exact
                path="*"
                component={<NotFoundError />}
                roles={['hue_outlook_sync']}
              />
            }
          />
          <Route
            path="/ui/error/config"
            element={
              <PrivateRoute
                exact
                path="*"
                component={<ConfigMissing />}
                roles={['hue_outlook_sync']}
              />
            }
          />
          <Route path="/ui/403" element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  )
}
