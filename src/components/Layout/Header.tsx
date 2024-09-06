import React, { useState } from "react";
import { Layout, Tooltip } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import LoginModal from "../Common/LoginModal";
import CustomLink from "../Common/Link";

const { Header } = Layout;

const CustomHeader: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalVisible(false);
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "space-between", // 양쪽 끝에 배치
    alignItems: "center",
    height: "64px",
    padding: "0 16px", // 양쪽에 적절한 패딩 추가
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "24px",
    color: "black",
  };

  return (
    <Header style={headerStyle}>
      {/* 왼쪽에 위치할 홈 아이콘 */}
      <CustomLink
        to="/"
        icon={<HomeOutlined style={iconStyle} />}
        tooltip="Go to location list"
        style={{ marginRight: "16px" }} // 오른쪽에 간격 추가
      />

      {/* 오른쪽에 위치할 로그인 아이콘 */}
      <div
        onClick={handleLoginClick}
        style={{ cursor: "pointer", marginLeft: "auto" }}
      >
        <Tooltip title="Login">
          <UserOutlined style={iconStyle} />
        </Tooltip>
      </div>

      {/* 로그인 모달 */}
      <LoginModal visible={isLoginModalVisible} onClose={handleCloseModal} />
    </Header>
  );
};

export default CustomHeader;
