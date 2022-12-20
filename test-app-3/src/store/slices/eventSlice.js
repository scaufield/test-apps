import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent(state, action) {
      state.events.push({
        id: Math.round(window.performance.now() * 10),
        date: action.payload.date,
        name: action.payload.name,
        time: action.payload.time,
        remind: action.payload.remind,
      });
    },
    removeEvent(state, action) {
      state.events = state.events.filter((event) => {
        return event.id !== action.payload;
      });
    },
    updateEvent(state, action) {
      const index = state.events.findIndex((event) => {
        return event.id.toString() === action.payload.id.toString();
      });
      state.events[index] = {
        ...state.events[index],
        ...action.payload,
      };
    },
  },
});

export const { removeEvent, addEvent, updateEvent } = eventSlice.actions;

export const selectEvents = (state) => {
  return state.eventSlice.events;
};

export const selectEvent = (date) => (state) => {
  return state.eventSlice.events.filter(
    (event) => event?.date?.toString() === date?.toString()
  );
};

export default eventSlice.reducer;
