import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SelectItem } from '../icons/index'
import { GetGroupName } from '../functions/groupname'

export default function Scene(props) {
  Scene.propTypes = {
    scene: PropTypes.any.isRequired
  }
  const [scene, setScene] = useState(props.scene)

  useEffect(() => {
    if (props.scene !== scene) {
      setScene(props.scene)
      console.log(props.scene)
    }
  }, [props])

  return (
    <div className="lampContianer" id={scene.apiUrl}>
      <p className="name">{scene.item.name}</p>
      {SelectItem(scene.item.name)}
      <h3>Group</h3>
      <h4>{GetGroupName(scene.item.group)[0]?.item.name}</h4>
    </div>
  )
}
