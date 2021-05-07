const mongoose = require('mongoose');


const extendedPropsSchema = new mongoose.Schema({
  ownerId: { type: String },
  movements: { type: String },
});

const CalendarSchema = new mongoose.Schema({
  title: { type: String },
  start: { type: Date },
  end: { type: Date },
  display: { type: String },
  extendedProps: [{
    ownerId: { type: String },
    movements: { type: String },
  }],
  fname: { type: String },
  lname: { type: String },
  createdAt: { type: String },
}, { timestamps: { createdAt: 'createdAt' } });


const Events = mongoose.model('Events', CalendarSchema, 'calendarevents');

module.exports = { Events };
