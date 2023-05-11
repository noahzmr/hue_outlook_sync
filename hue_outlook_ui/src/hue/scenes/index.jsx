import React, { useMemo, useContext } from 'react'
import Scene from './scene'
import { ScenesContext, QueryContext } from '../functions/context'
import { GetGroupName } from '../functions/groupname'

export default function Scenes() {
  /* eslint-disable no-unused-vars */
  const [scenes, setScenes] = useContext(ScenesContext)
  const [query, setQuery] = useContext(QueryContext)
  /* eslint-enable no-unused-vars */
  // Filter function
  const filterdScenes = useMemo(() => {
    return scenes?.filter((item) => {
      return (
        item.item.name?.toLowerCase().includes(query.toLowerCase()) ||
        GetGroupName(item.item.group)[0]?.item.name?.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [scenes, query])
  return (
    <div>
      <div className="hue">
        <h2>Scenes</h2>
        <div className="lamps">
          {filterdScenes?.map((item, index) => {
            return <Scene key={index} scene={item} />
          })}
        </div>
      </div>
    </div>
  )
}
