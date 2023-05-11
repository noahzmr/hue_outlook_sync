import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SelectItem } from '../icons/index'

export default function Sensor(props) {
  Sensor.propTypes = {
    sensors: PropTypes.any.isRequired
  }

  const [sensor, setSensor] = useState(props.sensors)

  useEffect(() => {
    if (props.sensors !== sensor) {
      setSensor(props.sensors)
      console.log('SENSOR: ', props.sensors)
    }
    console.log('SENSOR: ', props.sensors)
  }, [])
  return (
    <div className="lampContianer" id={sensor?.apiUrl}>
      <p className="name">{sensor?.item.name}</p>
      {SelectItem(sensor?.item.productname)}
      <h3>Group</h3>
    </div>
  )
}
