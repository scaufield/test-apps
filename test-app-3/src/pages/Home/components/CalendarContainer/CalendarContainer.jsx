import React, { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Badge, Calendar, Modal, notification } from "antd";
import ModalContent from "../ModalContent/ModalContent";
import { selectEvents } from "../../../../store/slices/eventSlice";

const CalendarContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const events = useSelector(selectEvents);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = (event) => {
    api.info({
      message: `Напоминание`,
      description: `У Вас запланировано ${event?.name
        } c ${event?.time[0].format("hh:mm")}  до ${event?.time[1].format(
          "hh:mm"
        )} `,
      placement: "topRight",
    });
  };

  useEffect(() => {
    const todayEvents = events.filter(
      (event) =>
        event.remind.toDate().toDateString() === new Date().toDateString()
    );

    for (let index = 0; index < todayEvents.length; index++) {
      const remind = todayEvents[index].remind;
      let startDate = todayEvents[index].time[0].toDate();
      const durationInMinutes = remind.$m;

      startDate.setMinutes(startDate.getMinutes() - durationInMinutes);
      startDate = dayjs(startDate);

      const now = dayjs();
      const diff = startDate.diff(now);

      if (diff > 0) {
        console.log(
          "Уведомление появится через:",
          Math.round(diff / 60000),
          "(минуты)"
        );
        setTimeout(() => openNotification(todayEvents[index]), diff);
      }
    }
  }, [events]);

  const showModal = (value) => {
    navigate("/", { replace: true });
    setSelectedDate(value);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    navigate("/", { replace: true });
  };

  const dateCellRender = useCallback(
    (value) => {
      const currentDate = value.date();
      const listData = events.filter(
        (event) => event?.date?.date() === currentDate
      );

      return (
        <ul className="events" style={{ listStyle: "none" }}>
          {listData.map((item) => (
            <li key={item.id}>
              <Badge status={"success"} text={item.name} />
            </li>
          ))}
        </ul>
      );
    },
    [events]
  );

  return (
    <>
      {contextHolder}
      <Calendar
        onSelect={showModal}
        style={{ margin: "30px" }}
        dateCellRender={dateCellRender}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        width={800}
        onCancel={handleCancel}
        footer={null}
        afterClose={handleClose}
      >
        <ModalContent date={selectedDate} />
      </Modal>
      );
    </>
  );
};
export default CalendarContainer;
