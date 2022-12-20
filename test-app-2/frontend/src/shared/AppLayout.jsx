import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

const { Content, Footer } = Layout;

const AppLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout
        className="layout"
        style={{
          minHeight: "100vh",
        }}
      >
        <Header />
        <br />
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </>
  );
};

export { AppLayout };
