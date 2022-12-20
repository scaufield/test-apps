import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CalendarContainer from "./pages/Home/components/CalendarContainer/CalendarContainer";
import { EventPage } from "./pages/Home/components/EventPage/EventPage";
import { EventsList } from "./pages/Home/components/EventsList/EventsList";
import NotFoundPage from "./shared/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarContainer />}>
        <Route index element={<EventsList />} />
        <Route path="new" element={<EventPage />} />
        <Route path=":id" element={<EventPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
