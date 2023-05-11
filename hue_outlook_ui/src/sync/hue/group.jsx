import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ScenesContext } from '../../hue/functions/context'
import PropTypes from 'prop-types'
import { GetGroupName } from '../../hue/functions/groupname'
import { CreateSync } from '../functions/post'
import { useNavigate } from 'react-router-dom'
import Scene from '../../hue/scenes/scene'

function Group(props) {
  const navigate = useNavigate()

  Group.propTypes = {
    outlookSearchValue: PropTypes.string.isRequired,
    outlookCondition: PropTypes.string.isRequired,
    syncName: PropTypes.string.isRequired,
    hueSearchValue: PropTypes.string.isRequired
  }
  const [query, setQuery] = useState('')
  const [scenes, setScenes] = useContext(ScenesContext)
  const [outlookSearchValue, setOutlookSearchValue] = useState()
  const [outlookCondition, setOutlookCondition] = useState()
  const [syncName, setSyncName] = useState()
  const [hueSearchValue, setHueSearchValue] = useState('')
  const [condtion, setCondition] = useState('')
  const [group, setGroup] = useState('')
  const [defaultScene, setDefaultScene] = useState('')

  const filterdScenes = useMemo(() => {
    return scenes?.filter((item) => {
      return (
        item.item.name?.toLowerCase().includes(query.toLowerCase()) ||
        GetGroupName(item.item.group)[0]?.item.name?.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [scenes, query])

  const defaultScenesFilter = useMemo(() => {
    const options = scenes?.filter((item) => {
      return item.item.group === group
    })
    return options?.filter((item) => {
      console.log('defaultScenesFilter', {
        Group: item.item.group,
        GroupName: GetGroupName(item.item.group)[0]?.item.name,
        WantedGroup: group,
        WantedGroupName: GetGroupName(group)[0]?.item.name,
        isInclude: item.item.group.includes(group)
      })
      return (
        item.item.name?.toLowerCase().includes(query.toLowerCase()) ||
        GetGroupName(item.item.group)[0]?.item.name?.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [group, query])

  const create = () => {
    console.log('Create new Sync')
    const json = {
      name: syncName,
      outlook: {
        search: outlookSearchValue,
        condition: outlookCondition
      },
      hue: {
        search: hueSearchValue,
        condition: condtion,
        group: group,
        default: defaultScene
      }
    }

    CreateSync(json).then(() => {
      navigate('/ui/syncer')
    })
  }
  useEffect(() => {
    console.log(props)
    if (outlookCondition !== props.outlookCondition) {
      setOutlookCondition(props.outlookCondition)
    }
    if (outlookSearchValue !== props.outlookSearchValue) {
      setOutlookSearchValue(props.outlookSearchValue)
    }
    if (syncName !== props.syncName) {
      setSyncName(props.syncName)
    }
    if (hueSearchValue !== props.hueSearchValue) {
      setHueSearchValue(props.hueSearchValue)
    }
  }, [props])
  useEffect(() => {
    if (condtion !== '' && document.getElementById('creatSyncNext')) {
      const oldBtn = document.getElementById('creatSyncNext')
      const newBtn = document.getElementById('creatSyncFinal')
      oldBtn.replaceWith(newBtn)
    }
  }, [defaultScene])
  return (
    <div>
      {condtion === '' ? (
        <div>
          <h3>Select the scene you want to run during the event</h3>
          <label className="input">
            <input
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              id="about"
              className="input__field"
              type="text"
              placeholder=" "
            />
            <span className="input__label"> Search</span>
          </label>
          <div className="lamps">
            {filterdScenes?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCondition(item.apiUrl)
                    setGroup(item.item.group)
                  }}>
                  <Scene key={index} scene={item} />
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <h3>Search for the scene that should run after the event</h3>
          <label className="input">
            <input
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              id="about"
              className="input__field"
              type="text"
              placeholder=" "
            />
            <span className="input__label"> Search</span>
          </label>
          <div className="lamps">
            {defaultScenesFilter?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setDefaultScene(item.apiUrl)
                  }}>
                  <Scene key={index} scene={item} />
                </div>
              )
            })}
          </div>
        </div>
      )}

      <button
        id="creatSyncFinal"
        style={{ visibility: condtion === '' ? 'hidden' : 'visible' }}
        onClick={() => {
          create()
        }}>
        Create
      </button>
    </div>
  )
}

export default Group
