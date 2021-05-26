import React from 'react';

import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import './calendar.component.css'

export default function Calendar({
    calendarEvents,
    showModal,
    handleDateSelect,
    handleEventClick,
 }) {

        return (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              displayEventEnd={true}
              events={calendarEvents}
              //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              select={showModal}
              eventContent={renderEventContent} // custom render function
              dateClick={handleDateSelect}
              eventClick={handleEventClick}
            />
        )
        function renderEventContent(eventInfo) {
            return (
              <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
              </>
            )
          }
    }

    