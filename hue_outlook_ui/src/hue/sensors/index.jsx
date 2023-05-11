import React, { useContext, useMemo } from 'react'
import { SensorsContext, QueryContext } from '../functions/context'
import Sensor from './sensor'

export default function Sensors() {
  /* eslint-disable no-unused-vars */
  const [sensors, setSensors] = useContext(SensorsContext)
  const [query, setQuery] = useContext(QueryContext)
  /* eslint-enable no-unused-vars */

  // Filter function
  const filterdSensors = useMemo(() => {
    return sensors?.filter((item) => {
      return (
        item.item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.item.productname?.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [sensors, query])
  return (
    <div>
      <div className="hue">
        <h2>sensors</h2>
        <div className="lamps">
          {filterdSensors?.map((item, index) => {
            return <Sensor key={index} sensors={item} />
          })}
        </div>
      </div>
    </div>
  )
}
