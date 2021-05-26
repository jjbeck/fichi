// calendar dialog that displays, and callbacks on change

import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import { formatDate } from '@fullcalendar/react'

import './calendar.dialog.css'


export default function CalendarDialog({
    showing,
    edit,
    onTitleChange,
    form,
    onDateChange,
    onStartTimeChange,
    onEndTimeChange, 
    onMovementChange,
    hideModal,
    handleSubmit,
    infoShowing,
    eventClicked,
    clickedEvent,
    hideInfoModal,
    showEditModal,
    handleDelete,
    clickedEventEditable,
    onTitleBlur,
    error,
}) {
    return (
    <>
<Dialog
        open={showing}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center">
        <h1 className="header-text">{edit ? "EDIT YOUR EVENT" : "CREATE YOUR EVENT"}</h1>
      </Grid>
      <Grid container justify="center">
        <TextField error={error} label="Enter a Title" required onChange={onTitleChange} value={edit? form.title : form.title}></TextField>
      </Grid>
      <Grid container justify="space-evenly">
        <Grid item lg={3}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          name="date"
          onChange={onDateChange}
          value={form.date}
          id="date-picker-inline"
          label="Pick a date"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        <Grid item lg={3}>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Pick a start time"
          onChange={onStartTimeChange}
          value={form.startTime}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        <Grid item lg={3}> 
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Pick an end time"
          onChange={onEndTimeChange}
          value={form.endTime}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <TextField margin="dense" fullWidth={true} multiline={true} onChange={onMovementChange} required value={form.movements} label="Enter a description"></TextField>
      </Grid>
    </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideModal} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={infoShowing}
        fullWidth
        maxWidth="md" 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="center">
        <h1 className="header-text">EVENT INFO</h1>
      </Grid>
      <Grid container justify="center">
        <h2 className="sub-header-text">Title: &nbsp;</h2>
        <h2 className="sub-header-text">{eventClicked? clickedEvent.title: ""}</h2>
      </Grid>
      <Grid container justify="space-evenly">
        <Grid  item lg={4}>
        <h2 className="sub-header-text">Date: &nbsp;</h2>
        <h2 className="sub-header-text">{eventClicked? formatDate(clickedEvent.start, {year: 'numeric', month: '2-digit', day: '2-digit'}) : ""}</h2>
        </Grid>
        <Grid  item lg={4}>
        <h2 className="sub-header-text" >Start Time: &nbsp;</h2>
        <h2 className="sub-header-text">{eventClicked? formatDate(clickedEvent.start, {hour: '2-digit', minute: '2-digit'}) : ""}</h2>
        </Grid>
        <Grid  item lg={4}> 
        <h2 className="sub-header-text">End Time: &nbsp;</h2>
        <h2 className="sub-header-text">{eventClicked? formatDate(clickedEvent.end, {hour: '2-digit', minute: '2-digit'}) : ""}</h2>
        </Grid>
      </Grid>
      <Grid container justify="center">
      <h2 className="sub-header-text">Description: &nbsp;</h2>
        <h2 className="sub-header-text">{eventClicked? clickedEvent._def.extendedProps[0].movements : ""}</h2>
      </Grid>
    </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideInfoModal} color="primary">
            Close
          </Button>
          <Button onClick={showEditModal} disabled={clickedEventEditable? false : true } color="primary" autoFocus>
            Edit
          </Button>
          <Button onClick={handleDelete} disabled={clickedEventEditable? false : true } color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    
    </>
    );
}

