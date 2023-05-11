import React, { useEffect, useState } from 'react'
import { SelectItem } from '../hue/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Config() {
  const navigate = useNavigate()
  const [values, setValues] = useState()
  const [on, setOn] = useState(true)
  const [warning, setWarning] = useState('none')
  const [warningMsg, setWarningMsg] = useState('none')
  const modal = document.querySelector('[data-modal]')

  const GetConfig = () => {
    axios
      .get('https://demo.noerkelit.online:3000/config', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Config: ', response.data)
        setValues(response.data)
        setOn(response.data.keycloak.KC_PUBLIC_CLIENT)
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate('/ui/403')
        }
      })
  }

  const UpdateConfig = () => {
    axios
      .post('https://demo.noerkelit.online:3000/config', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('key')}`
        }
      })
      .then((response) => {
        console.log('Config: ', response.data)
        console.log('Update Values')
      })
      .catch((err) => {
        console.log('Error message', err.response.data.status)
      })
  }
  const Validate36 = (str) => {
    return /^[a-zA-Z0-9-]{36}$/.test(str)
  }

  const ValidateIpAddress = (str) => {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/

    return ipv4Pattern.test(str) || ipv6Pattern.test(str)
  }

  const validateUrl = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/
    return pattern.test(url)
  }

  const validateString = (str) => {
    const pattern = /\S+/
    return pattern.test(str)
  }

  const Check = () => {
    const CheckAzure = () => {
      const tenantIdInput = document.getElementById('azureTenantId')
      const clientIdInput = document.getElementById('azureClientId')
      const clientSecretInput = document.getElementById('azureClientSecret')

      let isValid = true

      if (!Validate36(tenantIdInput.value)) {
        console.log('TenantId match not the conditions')
        tenantIdInput.style.border = '2px solid red'
        isValid = false
      } else {
        tenantIdInput.style.border = '2px solid green'
      }

      if (!Validate36(clientIdInput.value)) {
        console.log('ClientID match not the conditions')
        clientIdInput.style.border = '2px solid red'
        isValid = false
      } else {
        clientIdInput.style.border = '2px solid green'
      }

      if (!validateString(clientSecretInput.value)) {
        console.log('Client Secret match not the conditions')
        clientSecretInput.style.border = '2px solid red'
        isValid = false
      } else {
        clientSecretInput.style.border = '2px solid green'
      }

      return isValid
    }

    const CheckKeycloak = () => {
      const kcSsl = document.getElementById('KC_SSL').value
      const keycloakUrl = document.getElementById('keycloakUrl').value
      const keycloakRealm = document.getElementById('keycloakRealm').value
      const keycloakClient = document.getElementById('keycloakClient').value
      const kcPort = document.getElementById('kcPort').value

      const isValidKcSsl = validateString(kcSsl)
      const isValidKeycloakUrl = validateUrl(keycloakUrl)
      const isValidKeycloakRealm = validateString(keycloakRealm)
      const isValidKeycloakClient = validateString(keycloakClient)
      const isValidKcPort = validateString(kcPort)

      if (!isValidKcSsl) {
        console.log('KC_SSL does not match the conditions')
        document.getElementById('KC_SSL').style.border = '2px solid red'
      } else {
        document.getElementById('KC_SSL').style.border = '2px solid green'
      }

      if (!isValidKeycloakUrl) {
        console.log('keycloakUrl does not match the conditions')
        document.getElementById('keycloakUrl').style.border = '2px solid red'
      } else {
        document.getElementById('keycloakUrl').style.border = '2px solid green'
      }

      if (!isValidKeycloakRealm) {
        console.log('keycloakRealm does not match the conditions')
        document.getElementById('keycloakRealm').style.border = '2px solid red'
      } else {
        document.getElementById('keycloakRealm').style.border = '2px solid green'
      }

      if (!isValidKeycloakClient) {
        console.log('keycloakClient does not match the conditions')
        document.getElementById('keycloakClient').style.border = '2px solid red'
      } else {
        document.getElementById('keycloakClient').style.border = '2px solid green'
      }

      if (!isValidKcPort) {
        console.log({
          msg: 'kcPort does not match the conditions',
          value: kcPort
        })
        document.getElementById('kcPort').style.border = '2px solid red'
      } else {
        console.log({
          msg: 'kcPort matches the conditions',
          value: kcPort
        })
        document.getElementById('kcPort').style.border = '2px solid green'
      }

      // Return true if all conditions are valid, false otherwise
      return (
        isValidKcSsl &&
        isValidKeycloakUrl &&
        isValidKeycloakRealm &&
        isValidKeycloakClient &&
        isValidKcPort
      )
    }

    const CheckHue = () => {
      const hueNameInput = document.getElementById('hueName')
      const hueUserInput = document.getElementById('hueUser')
      const hueIpInput = document.getElementById('hueIp')

      const isHueNameValid = validateString(hueNameInput.value)
      const isHueUserValid = validateString(hueUserInput.value)
      const isHueIpValid = ValidateIpAddress(hueIpInput.value)

      if (!isHueNameValid) {
        console.log('hueName does not match the conditions')
        hueNameInput.style.border = '2px solid red'
      } else {
        hueNameInput.style.border = '2px solid green'
      }

      if (!isHueUserValid) {
        console.log('hueUser does not match the conditions')
        hueUserInput.style.border = '2px solid red'
      } else {
        hueUserInput.style.border = '2px solid green'
      }

      if (!isHueIpValid) {
        console.log('hueIp does not match the conditions')
        hueIpInput.style.border = '2px solid red'
      } else {
        hueIpInput.style.border = '2px solid green'
      }

      return isHueNameValid && isHueUserValid && isHueIpValid
    }

    const isValidHue = CheckHue()
    const isValidKeycloak = CheckKeycloak()
    const isValidAzure = CheckAzure()
    if (isValidHue && isValidKeycloak && isValidAzure) {
      console.log('All conditions were met')
      return true
    } else {
      console.log('There are invalid inputs')
      return false
    }
  }

  const Update = () => {
    console.log(Check(), values)
    if (Check()) {
      UpdateConfig()
    }
  }

  const createUser = () => {
    axios
      .get(
        `https://demo.noerkelit.online:3000/hue/registerDevice/${values?.hue.HUE_IP}/values?.hue.HUE_NAME`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('key')}`,
            Outlook: localStorage.getItem('outlook')
          }
        }
      )
      .then((response) => {
        if (response.data === 'link button not pressed') {
          setWarning('flex')
          setWarningMsg(response.data)
        } else {
          console.warn(response.data)
          values.hue.HUE_USER = response.data
          modal.close()
          setWarning('none')
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }
  useEffect(() => {
    GetConfig()
  }, [])
  return (
    <div className="config">
      <button
        onClick={() => {
          GetConfig()
        }}>
        Get Config
      </button>
      <div className="homeItem">
        <div className="lampContianer">{SelectItem('azure')}</div>
        <div className="items">
          <label className="input">
            <input
              id="azureTenantId"
              className="input__field"
              type="text"
              placeholder={values?.azure?.TENANT_ID}
              onChange={(e) => {
                values.azure.TENANT_ID = e.target.value
              }}
              minLength="36"
              maxLength="36"
            />
            <span className="input__label">Tenant</span>
          </label>
          <label className="input">
            <input
              id="azureClientId"
              className="input__field"
              type="text"
              placeholder={values?.azure?.CLIENT_ID}
              onChange={(e) => {
                values.azure.CLIENT_ID = e.target.value
              }}
              minLength="36"
              maxLength="36"
            />
            <span className="input__label">Client</span>
          </label>
          <label className="input">
            <input
              id="azureClientSecret"
              className="input__field"
              type="password"
              placeholder={values?.azure?.CLIENT_SECRET}
              onChange={(e) => {
                values.azure.CLIENT_SECRET = e.target.value
              }}
            />
            <span className="input__label">Secret</span>
          </label>
        </div>
      </div>
      <div className="homeItem">
        <div className="lampContianer">{SelectItem('keycloak')}</div>
        <div className="items">
          <label className="input">
            <input
              id="keycloakRealm"
              className="input__field"
              type="text"
              placeholder={values?.keycloak.KC_REALM}
              onChange={(e) => {
                values.keycloak.KC_REALM = e.target.value
              }}
            />
            <span className="input__label">Realm</span>
          </label>
          <label className="input">
            <input
              id="keycloakClient"
              className="input__field"
              type="text"
              placeholder={values?.keycloak.KC_CLIENT}
              onChange={(e) => {
                values.keycloak.KC_CLIENT = e.target.value
              }}
            />
            <span className="input__label">Client</span>
          </label>
          <label className="input">
            <input
              id="KC_SSL"
              className="input__field"
              type="text"
              placeholder={values?.keycloak.KC_SSL}
              onChange={(e) => {
                values.keycloak.KC_SSL = e.target.value
              }}
            />
            <span className="input__label">SSL</span>
          </label>
          <label className="input">
            <input
              id="keycloakUrl"
              className="input__field"
              type="text"
              placeholder={values?.keycloak.KC_URL}
              onChange={(e) => {
                values.keycloak.KC_URL = e.target.value
              }}
            />
            <span className="input__label">Url</span>
          </label>
          <label className="input">
            <input
              id="kcPort"
              className="input__field"
              type="number"
              placeholder={values?.keycloak.KC_PORT}
              onChange={(e) => {
                values.keycloak.KC_PORT = e.target.value
              }}
            />
            <span className="input__label">Port</span>
          </label>
          <div id="kc_public">
            <p>Public</p>
            <label className="switch">
              <input
                value={on}
                defaultChecked={on}
                type="checkbox"
                onClick={(e) => {
                  values.keycloak.KC_PUBLIC_CLIENT = !on
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="homeItem">
        <div className="lampContianer">{SelectItem('bridge')}</div>
        <div className="items">
          <label className="input">
            <input
              id="hueName"
              className="input__field"
              type="text"
              placeholder={values?.hue?.HUE_NAME}
              onChange={(e) => {
                values.hue.HUE_NAME = e.target.value
              }}
            />
            <span className="input__label">Name</span>
          </label>
          <label className="input">
            <input
              id="hueIp"
              className="input__field"
              type="text"
              placeholder={values?.hue?.HUE_IP}
              onChange={(e) => {
                values.hue.HUE_IP = e.target.value
              }}
            />
            <span className="input__label">IP</span>
          </label>
          <label className="input">
            <input
              onClick={() => {
                modal.showModal()
              }}
              id="hueUser"
              className="input__field"
              type="text"
              value={values?.hue?.HUE_USER}
              placeholder={values?.hue?.HUE_USER}
            />
            <span className="input__label">User</span>
          </label>

          <dialog data-modal>
            <ol>
              <li>Make sure that you have assigned the IP and a name.</li>
              <li>
                Make sure that your Philips Hue Bridge is close to your device. The bridge should be
                connected to a power source with a power adapter and connected to your router with
                an Ethernet cable.
              </li>
              <li>
                Press the round button on the top of the Philips Hue Bridge. The button is located
                in the center of the bridge and is surrounded by a circle.
              </li>
              <li>Press the Create button on the page.</li>
            </ol>
            <div className="warning" style={{ display: warning }}>
              {warningMsg}
            </div>
            <button
              onClick={() => {
                modal.close()
              }}
              data-closed-modal
              formMethod="dialog"
              type="submit">
              Cancel
            </button>
            <button
              onClick={() => {
                createUser()
              }}>
              Create
            </button>
          </dialog>
        </div>
      </div>
      <button
        onClick={() => {
          Update()
        }}>
        Update
      </button>
    </div>
  )
}
