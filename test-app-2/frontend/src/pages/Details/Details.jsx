import React, { useEffect, useState } from "react";
import { Result, Typography, Button, Skeleton, Card } from "antd";
import { useParams } from "react-router-dom";
import { HistoryBackButton } from "../../shared/HistoryBackButton";
import useFetch from "../../hooks/useFetch";

const { Text } = Typography;

const Details = () => {
  const { id } = useParams();
  const apiUrl = `http://localhost:7070/api/services/${id}`;
  const { data, error, loading, fetchData } = useFetch(apiUrl);

  const errorResult = () => (
    <Result
      status="warning"
      title=" Извините, что-то пошло не так."
      extra={
        <Button onClick={() => fetchData(apiUrl)}>Повторить запрос</Button>
      }
    />
  );

  if (error) {
    console.log("Error:", error);
    return errorResult();
  }

  return (
    <>
      <Card
        title={
          <div>
            {loading && <Skeleton.Input active size="small" />}
            {data.name}
          </div>
        }
        actions={[<HistoryBackButton>Назад</HistoryBackButton>]}
      >
        <Skeleton active loading={loading}>
          <Text type="secondary">Цена: {data.price} </Text>
          <Text>
            <p>{data.content} </p>
          </Text>
        </Skeleton>
      </Card>
    </>
  );
};
export default Details;
