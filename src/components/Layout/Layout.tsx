import React from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom"; // 현재 경로를 가져오기 위한 훅
import AppRoutes from "../../routes";
import Header from "./Header";
import Footer from "./Footer";

const CustomLayout: React.FC = () => {
  const location = useLocation();

  const showHeader = location.pathname === "/course";

  return (
    <Layout
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      {showHeader && <Header />}

      <Layout.Content style={{ position: "relative" }}>
        <AppRoutes />
      </Layout.Content>
      {/* <Footer style={{ position: "fixed", zIndex: 1, width: '100%', bottom: 0, textAlign:'center' }} /> */}
    </Layout>
  );
};

export default CustomLayout;
