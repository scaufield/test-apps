import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import { AppLayout } from "./shared/AppLayout";
import NotFoundPage from "./shared/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
