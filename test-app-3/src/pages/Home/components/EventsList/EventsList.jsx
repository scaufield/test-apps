import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext, Link } from "react-router-dom";
import { Divider, List, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { selectEvent, removeEvent } from "../../../../store/slices/eventSlice";

const EventsList = () => {
  const [date] = useOutletContext();
  const dispatch = useDispatch();
  const events = useSelector(selectEvent(date));

  return (
    <>
      <Link to="new">
        <Button icon={<PlusOutlined />}>Добавить мероприятие</Button>
      </Link>
      <Divider />
      <List
        dataSource={events}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link to={`/${item.id}`} key="list-loadmore-edit">
                Редактировать
              </Link>,
              <a
                onClick={() => dispatch(removeEvent(item.id))}
                key="list-loadmore-more"
              >
                Удалить
              </a>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={
                <Row justify="start" gutter={9}>
                  <Col>
                    C {item?.time[0].format("hh:mm")} до{" "}
                    {item?.time[1].format("hh:mm")}
                    {"; "}
                  </Col>
                  <Col>Напоминание за {item.remind.$m} (минут)</Col>
                </Row>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export { EventsList };
