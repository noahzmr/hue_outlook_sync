import React, { useContext, useMemo } from 'react'
import { QueryContext } from '../hue/functions/context'
import HueHeader from '../hue/header'
import { EventContext } from './function/context'
import CalendarView from './calendar'

function Calendar() {
  /* eslint-disable no-unused-vars */
  const [query, setQuery] = useContext(QueryContext)
  const [event, setEvent] = useContext(EventContext)
  /* eslint-enable no-unused-vars */

  const filterdEvents = useMemo(() => {
    console.log('event: ', Array.isArray(event))
    if (!Array.isArray(event)) {
      console.log('No events found', event)
    } else {
      return event?.filter((item) => {
        return (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.showAs.toLowerCase().includes(query.toLowerCase())
        )
      })
    }
  }, [event, query])

  return (
    <div>
      <HueHeader />
      <CalendarView events={filterdEvents} />
    </div>
  )
}

export default Calendar
