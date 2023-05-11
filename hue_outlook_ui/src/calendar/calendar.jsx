import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function CalendarView(props) {
  CalendarView.propTypes = {
    events: PropTypes.any
  }
  const [event, setEvent] = useState()
  const calendarRef = useRef(null)

  useEffect(() => {
    if (event !== props.events) {
      setEvent(props.events)
    }
  }, [props])


  return (
    <div id="kalendar">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listGridPlugin]}
        weekends={true}
        weekNumbers={true}
        selectable={true}
        eventAllow={true}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,dayGridMonth,timeGridWeek,timeGridDay,next',
          center: 'title',
          right: 'today'
        }}
        titleFormat={{ day: 'numeric', month: 'short' }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
        events={event}
        nowIndicator
        eventClick={(e) => {
          console.log('e.event.id', e.event?.id)
        }}
        droppable={true}
        dayMaxEventRows={false} // for all non-TimeGrid views
        timeZone="Europe/Berlin"
        locale={'de'}
        slotMinTime="06:00:00"
        slotMaxTime="23:01:00"
        firstDay={1}
        height={'auto'}
      />
    </div>
  )
}

export default CalendarView
