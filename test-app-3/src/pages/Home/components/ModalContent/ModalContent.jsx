import React from "react";
import { Outlet } from "react-router-dom";
import { Divider } from "antd";

const ModalContent = ({ date }) => {
  return (
    <>
      <Divider orientation="left">
        Мероприятия на {date.format("DD.MM.YYYY")}
      </Divider>
      <Outlet context={[date]} />
    </>
  );
};

export default ModalContent;
