import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SelectItem } from '../icons/index'
import { GetLamp } from '../functions/load/get'

export default function Small(props) {
  Small.propTypes = {
    id: PropTypes.any.isRequired
  }
  const [lamp, setLamp] = useState()

  useEffect(() => {
    GetLamp(props.id)
      .then((values) => {
        console.log('LAMP VALUE: ', values)
        setLamp(values)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="lampContianer">
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            alignItems: 'center'
          }}>
          <h3 className="name">{lamp?.name}</h3>
          {lamp?.productname}
        </div>
        {SelectItem(lamp?.productname)}
      </div>
    </div>
  )
}
