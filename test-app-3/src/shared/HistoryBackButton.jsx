import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const HistoryBackButton = ({ children, ...props }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Button onClick={goBack} {...props}>
      {children}
    </Button>
  );
};

export { HistoryBackButton };
