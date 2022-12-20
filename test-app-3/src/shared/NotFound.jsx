import React from "react";
import { Result } from "antd";
import { HistoryBackButton } from "./HistoryBackButton";

const NotFoundPage = () => {
  return (
    <Result
      status="warning"
      title="Страница не найдена"
      extra={<HistoryBackButton>Вернуться назад</HistoryBackButton>}
    />
  );
};

export default NotFoundPage;
