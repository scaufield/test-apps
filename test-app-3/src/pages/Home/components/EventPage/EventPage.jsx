import React from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  addEvent,
  updateEvent,
  selectEvents,
} from "../../../../store/slices/eventSlice";
import { Form, Input, Button, TimePicker, Divider, message } from "antd";
import { HistoryBackButton } from "../../../../shared/HistoryBackButton";

const EventPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [date] = useOutletContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const navigate = useNavigate();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Мероприятие добавлено!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Что-то пошло не так...",
    });
  };

  const onFinish = (values) => {
    if (id) {
      dispatch(updateEvent({ id, ...values, date }));
    } else {
      dispatch(addEvent({ ...values, date }));
    }
    success();
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    error();
    console.log("Failed:", errorInfo);
  };

  const format = "HH:mm";
  const formatRemind = "mm";

  const getInitialValues = () => {
    const currentEvent = events.find((event) => {
      return event.id.toString() === id?.toString();
    });

    return {
      name: currentEvent?.name,
      id: currentEvent?.id,
      remind: currentEvent?.remind,
      time: currentEvent?.time,
    };
  };

  return (
    <>
      <HistoryBackButton>Назад</HistoryBackButton>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        initialValues={id ? getInitialValues() : null}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Название мероприятия"
          name="name"
          rules={[{ required: true, message: "Пожалуйста, введите название!" }]}
          initialValue={"Мероприятие"}
        >
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item
          label="Время начала и конца"
          name="time"
          rules={[{ required: true, message: "Пожалуйста, введите время!" }]}
          initialValue={[dayjs("12:08", "HH:mm"), dayjs("12:10", "HH:mm")]}
        >
          <TimePicker.RangePicker
            format={format}
            placeholder={["Выберите время", "Выберите время"]}
          />
        </Form.Item>
        <Form.Item
          label="Напомнить за (минуты)"
          name="remind"
          initialValue={dayjs("05", "mm")}
          rules={[{ required: true, message: "Пожалуйста, введите время!" }]}
        >
          <TimePicker
            format={formatRemind}
            placeholder="Выберите время в минутaх"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
          {contextHolder}
          <Button
            htmlType="submit"
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export { EventPage };
