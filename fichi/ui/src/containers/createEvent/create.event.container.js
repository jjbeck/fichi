import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';



function CreateEventContainer() {


    return (
        <>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center">
        <h1 className="header-text">"CREATE YOUR EVENT"</h1>
      </Grid>
      <Grid container justify="center">
        <TextField  label="Enter a Title" ></TextField>
      </Grid>
      <Grid container justify="space-evenly">
        <Grid item lg={3}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          value="02/23/1994"
          name="date"
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
          value="02/23/1994"
          label="Pick a start time" 
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
        <Grid item lg={3}> 
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          value="02/23/1994"
          label="Pick an end time"
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <TextField margin="dense" fullWidth={true} multiline={true} label="Enter a description"></TextField>
      </Grid>
    </MuiPickersUtilsProvider>
    
          <Button  color="primary">
            Close
          </Button>
          <Button color="primary" autoFocus>
            Submit
          </Button>
        </>
    )
}

export default CreateEventContainer;