//Calendar container that performs CRUD operations and send props to calendar component
import React from 'react';

import CalendarDialog from '../../components/calendar/calendar.dialog.component.jsx'
import Calendar from '../../components/calendar/calendar.component.jsx'

import { formatDate } from '@fullcalendar/react'

import moment from 'moment'
moment().format();

import './calendar.container.css';
import graphQLFetch from '../../api_handlers/graphQLFetch.js'


export default class CalendarContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          Id: 'saw123',
          clickedEvent: [],
          eventClicked: false,
          clickedEventEditable: false,
          edit: false,
          showing: false,
          infoShowing: false,
          form: {title: '', date: '', startTime: '', endTime: '', movements: ''},
          titleError: false,
          calendarEvents : [],
          
        }     
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showInfoModal = this.showInfoModal.bind(this);
        this.hideInfoModal = this.hideInfoModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this); 
        this.onDateChange = this.onDateChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onStartTimeChange = this.onStartTimeChange.bind(this);
        this.onEndTimeChange = this.onEndTimeChange.bind(this);
        this.onMovementChange = this.onMovementChange.bind(this);     
    }

    componentDidMount() {
      this.loadEvents();
    }

    
    async loadEvents() {
      const query = `query {
        getCalendarEvents {
          _id
          title
          start
          end
          display
          extendedProps { ownerId, movements }
        }
      }`;

      const data = await graphQLFetch(query);
      
      if (data) {
        this.setState({ calendarEvents: data.data.getCalendarEvents})
      }

      let events = [ ...this.state.calendarEvents];

      if (this.state.calendarEvents.length === undefined) {
        if (this.state.calendarEvents.extendedProps[0].ownerId === this.state.Id) {
          events.backgroundColor = '#2ad657';
        } else {
          events.backgroundColor = '#9c2ad6';
        }
    } else { for (var key in this.state.calendarEvents) {
      if (this.state.calendarEvents[key].extendedProps[0].ownerId === this.state.Id) {
        events[key].backgroundColor = '#2ad657';
      } else {
        events[key].backgroundColor = '#9c2ad6';
      }
    } }
    this.setState({ calendarEvents: events })
    }

    render() {
  
      return (
        <>
        <div className='demo-app'>
          <div className='demo-app-main'>
            <Calendar
            calendarEvents={this.state.calendarEvents}
            showModal={this.showModal}
            handleDateSelect={this.handleDateSelect}
            handleEventClick={this.handleEventClick}
           />
            <div>

      <CalendarDialog 
      showing={this.state.showing}
      edit={this.state.edit}
      onTitleChange={this.onTitleChange}
      form={this.state.form}
      onDateChange={this.onDateChange}
      onStartTimeChange={this.onStartTimeChange}
      onEndTimeChange={this.onEndTimeChange}
      onMovementChange={this.onMovementChange}
      hideModal={this.hideModal}
      handleSubmit={this.handleSubmit}
      infoShowing={this.state.infoShowing}
      eventClicked={this.state.eventClicked}
      clickedEvent={this.state.clickedEvent}
      hideInfoModal={this.hideInfoModal}
      showEditModal={this.showEditModal}
      handleDelete={this.handleDelete}
      clickedEventEditable={this.state.clickedEventEditable}
      />
    </div>  
          </div>  
        </div>   
    </>
      )
    }

    onDateChange(event, naturalValue) {
      this.setState({ form: {...this.state.form, 'date' : naturalValue}})
    }

    onTitleChange(event) {
      this.setState({ form: {...this.state.form, 'title' : event.target.value}})
    }

    onStartTimeChange(event, naturalValue) {
      this.setState({ form: {...this.state.form, 'startTime' : event.toISOString()}})
    }

    onEndTimeChange(event, naturalValue) {
      this.setState({ form: {...this.state.form, 'endTime' : event.toISOString()}})
    }

    onMovementChange(event) {
      this.setState({ form: {...this.state.form, 'movements' : event.target.value}})
    }

    async handleSubmit(e) {
      e.preventDefault();
      const { form, clickedEvent } = this.state;
      
      
      const startDate = new Date(form.date);
      const startTime = new Date(form.startTime);
      startDate.setHours(startTime.getHours())
      startDate.setMinutes(startTime.getMinutes());
      const endDate = new Date(form.date);
      const endTime = new Date(form.endTime);
      endDate.setHours(endTime.getHours())
      endDate.setMinutes(endTime.getMinutes());
      
      const calendarEvent =  {
        title: form.title,
        start: startDate,
        end: endDate,
        display: 'block',
        extendedProps: [{
          ownerId: this.state.Id,
          movements: form.movements,
        }],
      }

      if (this.state.edit) {
        const _id = this.state.clickedEvent._def.extendedProps._id;
        const query = `mutation setCalendarEventUpdate(
          $_id: String!
          $changes: CalendarEventUpdate!
        ) {
          setCalendarEventUpdate(
            _id: $_id
            changes: $changes
          ) {
            title
          }
        }`;

        const data = await graphQLFetch(query, {"changes": calendarEvent, _id})

        if (data) {
          this.loadEvents();
        }
      
      } else {
        const query = `mutation setCalendarEvent($event: SetCALENDAREVENT!) {
          setCalendarEvent(event: $event) {
            title
          }
        } `
        const data = await graphQLFetch(query, {"event": calendarEvent });
        if (data) {
          this.loadEvents();
        }
      }

      this.hideModal();
    }


    hideModal() {
      this.setState({ showing: false, edit: false })
    }

    showModal() {
      this.setState({showing: true })
    }

    showEditModal() {
      this.setState({ showing: true, edit: true, infoShowing: false  })
    }

    showInfoModal() {
      this.setState({ infoShowing: true })
    }

    hideInfoModal() {
      this.setState({ infoShowing: false })
    }
  
    handleDelete = () => { 
      this.state.clickedEvent.remove();
      this.setState({ clickedEvent: [], eventClicked: false,
        clickedEventEditable: false,
        showing: false,
        infoShowing: false,})
    }
  
    handleDateSelect = (selectInfo) => {
      this.setState({form: {title: '', date: new Date(), startTime: new Date(), endTime: new Date(), movements: ''}})
    }
  
    handleEventClick = (clickInfo) => {
      this.setState({
        clickedEvent: clickInfo.event,
        edit: false, //for now a way to exit out of edit field if user clicks another or same event
        eventClicked: true,
        form: {title: clickInfo.event.title, date: formatDate(clickInfo.event.start, {year: 'numeric', month: '2-digit', day: 'numeric'}), 
        startTime: clickInfo.event.start.toISOString(), endTime: clickInfo.event.end.toISOString(), movements: clickInfo.event.extendedProps[0].movements}
      })
  
      if (this.state.Id === clickInfo.event._def.extendedProps[0].ownerId) {
        this.setState({ clickedEventEditable: true })
      } else {
        this.setState({ clickedEventEditable: false })
      }
      this.showInfoModal();
      }

    }





