import React, { useContext, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import Lamp from './lamp'
import { LampsContext, QueryContext } from '../functions/context'

export default function Lamps() {
  /* eslint-disable no-unused-vars */
  const [lamp, setLamp] = useContext(LampsContext)
  const [query, setQuery] = useContext(QueryContext)
  /* eslint-enable no-unused-vars */
  // Filter function
  const filterdLamps = useMemo(() => {
    return lamp?.filter((item) => {
      return (
        item.item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.item.productname?.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [lamp, query])
  return (
    <div>
      <div className="hue">
        <h4>click on a lamp to get more details</h4>
        <div className="lamps">
          {filterdLamps?.map((item, index) => {
            return <Lamp key={index} lamp={item} />
          })}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
