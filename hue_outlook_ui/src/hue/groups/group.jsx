import React, { useEffect, useState, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { SelectItem } from '../icons/index'
import Small from '../lamps/small'
import { ScenesContext, QueryContext } from '../functions/context'
import Scene from '../scenes/scene'

export default function Group(props) {
  Group.propTypes = {
    group: PropTypes.any.isRequired
  }

  /* eslint-disable no-unused-vars */
  const [group, setGroup] = useState(props.group)
  const [scenes, setScenes] = useContext(ScenesContext)
  const [height, setHeight] = useState('300px')
  const [query, setQuery] = useContext(QueryContext)
/* eslint-enable no-unused-vars */

  // Filter function
  const defaultScenesFilter = useMemo(() => {
    console.log('SCAN', scenes, group.apiUrl)
    const options = scenes?.filter((item) => {
      return item.item.group === group.apiUrl
    })
    return options?.filter((item) => {
      console.log('defaultScenesFilter', item.item, {
        Group: item.item.group,
        WantedGroup: group,
        isInclude: item.item.group.includes(group)
      })
      return (
        item.item.name?.toLowerCase().includes(query.toLowerCase()) ||
        group.item.name.includes(query.toLowerCase())
      )
    })
  }, [group, query])

  useEffect(() => {
    if (props.group !== group) {
      setGroup(props.group)
      console.log('GROUP VALUES', props.group)
    }
  }, [props])

  return (
    <div className="contianer" id={group.apiUrl} style={{ height: height }}>
      <div className="header">
        <div>
          <div
            style={{
              borderRadius: '50%',
              padding: '1em'
            }}>
            {SelectItem(group.item.class)}
          </div>
        </div>
      </div>

      <div className="body">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            alignItems: 'center'
          }}>
          <h3 className="name">{group.item.name}</h3>
          <i
            onClick={() => {
              height === '350px' ? setHeight('fit-content') : setHeight('350px')
            }}
            className={height === '350px' ? 'bi bi-caret-down' : 'bi bi-caret-up'}></i>
        </div>
        <div>
          <h3>Lamps</h3>
          <div className="lampSlider">
            {group.item.lights.map((item, index) => {
              console.log({ lampId: item, groupId: group.apiUrl })
              return (
                <div key={index}>
                  <Small id={item} />
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h3>Scenes</h3>
          <div className="lampSlider">
            {defaultScenesFilter?.map((item, index) => {
              console.log('Scene', item)
              return (
                <div key={index}>
                  <Scene key={index} scene={item} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
