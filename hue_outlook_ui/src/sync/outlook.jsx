import React, { useContext, useEffect, useMemo, useState } from 'react'
import { EventContext } from '../calendar/function/context'
import HueSync from './hue/index'
import PropTypes from 'prop-types'
import CalendarView from '../calendar/calendar'
import { useNavigate } from 'react-router-dom'

function OutllokSync(props) {
  OutllokSync.propTypes = {
    syncName: PropTypes.string.isRequired
  }
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [event, setEvent] = useContext(EventContext)
  const [searchValue, setSearchValue] = useState('')
  const [condtion, setCondition] = useState('')
  const [syncName, setSyncName] = useState()
  const [show, setShow] = useState('outlook')
  const filterdEvents = useMemo(() => {
    return event?.filter((item) => {
      return searchValue === 'title'
        ? item.title?.toLowerCase().includes(condtion.toLowerCase())
        : item.showAs?.toLowerCase().includes(condtion.toLowerCase())
    })
  }, [event, condtion, searchValue])

  const handleSwitch = (value) => {
    setCondition('')
    if (
      document.getElementById('status').checked === false &&
      document.getElementById('title').checked === false
    ) {
      setSearchValue('')
    } else {
      setSearchValue(value)
      if (value === 'title') {
        document.getElementById('status').checked = false
      } else if (value === 'status') {
        document.getElementById('title').checked = false
      }
    }
  }

  useEffect(() => {
    if (syncName !== props.syncName) {
      setSyncName(props.syncName)
    }
  }, [props])

  return (
    <div className="container">
      <div className="body">
        {show === 'outlook' ? (
          <div>
            <h1>Outlook Options:</h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around'
              }}>
              <h3>{searchValue === '' ? <></> : `Search for ${searchValue}`}</h3>
              <div>
                <h4>Title</h4>
                <label className="switch">
                  <input
                    id="title"
                    value="title"
                    onChange={(e) => {
                      handleSwitch(e.target.value)
                    }}
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div>
                <h4>Status</h4>
                <label className="switch">
                  <input
                    id="status"
                    value="status"
                    onChange={(e) => {
                      handleSwitch(e.target.value)
                    }}
                    type="checkbox"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="lamps" style={{ width: '100%' }}>
              <div>
                {searchValue === '' ? (
                  <></>
                ) : searchValue === 'title' ? (
                  <label className="input">
                    <input
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setCondition(e.target.value)
                      }}
                      id="about"
                      className="input__field"
                      type="text"
                      placeholder=" "
                    />
                    <span className="input__label"> The title must include</span>
                  </label>
                ) : (
                  <select
                    defaultValue={'DEFAULT'}
                    onChange={(e) => {
                      setCondition(e.target.value)
                    }}>
                    <option value="DEFAULT" disabled>
                      Choose Status
                    </option>
                    <option value="busy">Beschäftig</option>
                    <option value="free">Frei</option>
                    <option value="oof">Out of Office</option>
                    <option value="workingElsewhere">Termin vor Ort</option>
                  </select>
                )}
              </div>
              <div className="calendar">
                <h3>Affected events</h3>
                <div className="body">
                  <CalendarView events={filterdEvents} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <HueSync
            outlookSearchValue={searchValue}
            outlookCondition={condtion}
            syncName={syncName}
          />
        )}
      </div>

      <div className="button">
        {show === 'outlook' ? (
          <button
            onClick={() => {
              navigate('/ui/syncer')
            }}>
            Cancle
          </button>
        ) : (
          <button
            onClick={() => {
              setShow('outlook')
            }}>
            Back
          </button>
        )}

        <button
          id="creatSyncNext"
          onClick={() => {
            setShow('hue')
          }}>
          Next
        </button>
      </div>
    </div>
  )
}

export default OutllokSync
