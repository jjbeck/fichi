
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: '2021-04-22T08:00:00',
    end: '2021-04-22T09:30:00',
    display: 'block',
    extendedProps: {
      ownerId: 'a123',
      streamUrl: 'www.examplestream.com',
      movements: 'abs, squats, burpees',
    },
  },
  {
    id: createEventId(),
    title: 'Other event',
    start: '2021-04-24T08:00:00',
    end: '2021-04-24T09:30:00',
    display: 'block',
    extendedProps: {
      ownerId: 'b123',
      streamUrl: 'www.examplestream2.com',
      movements: 'abs, pullups, burpees',
    },
  },
];

export function createEventId() {
  return String(eventGuid++)
}
