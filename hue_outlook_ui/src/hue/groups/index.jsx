import React, { useContext, useMemo } from 'react'
import Group from './group'
import { GroupContext, QueryContext } from '../functions/context'
export default function Groups() {
  /* eslint-disable no-unused-vars */
  const [groups, setGroups] = useContext(GroupContext)
  const [query, setQuery] = useContext(QueryContext)
  /* eslint-enable no-unused-vars */

  // Filter function
  const filterdGroups = useMemo(() => {
    return groups?.filter((item) => {
      return item.item.name?.toLowerCase().includes(query.toLowerCase())
    })
  }, [groups, query])

  return (
    <div>
      <div className="hue">
        <h2>Groups</h2>
        <div className="lamps">
          {filterdGroups.map((item, index) => {
            return <Group key={index} group={item} />
          })}
        </div>
      </div>
    </div>
  )
}
