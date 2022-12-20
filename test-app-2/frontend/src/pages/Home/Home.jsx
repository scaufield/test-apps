import React, { useEffect, useState } from "react";
import { Result, Button, List, Skeleton } from "antd";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const apiUrl = `http://localhost:7070/api/services`;

const Home = () => {
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
    console.log("Error", error);
    return errorResult();
  }
  return (
    <List
      className="demo-loadmore-list"
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      style={{
        minHeight: "100vh",
      }}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              to={`/${item.id}`}
              key="list-loadmore-edit"
              title={<Link to={`details/${item.id}`}> {item.name}</Link>}
              description={`Цена: ${item.price}`}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default Home;
