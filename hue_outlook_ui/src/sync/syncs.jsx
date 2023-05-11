import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { GetGroupName } from '../hue/functions/groupname'
export default function Sync(props) {
  Sync.propTypes = {
    sync: PropTypes.any.isRequired
  }

  const [sync, setSync] = useState(props.sync)

  useEffect(() => {
    if (props.sync !== sync) {
      setSync(props.sync)
      console.log(props.sync)
    }
  }, [props])

  return (
    <div className="lampContianer">
      <p className="name">{sync.name}</p>
      {GetGroupName(sync.hue.condition)}
    </div>
  )
}
