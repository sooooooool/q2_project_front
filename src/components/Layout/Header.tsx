import React, { useState } from "react";
import { Layout, Tooltip } from "antd";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";
import LoginModal from "../Common/LoginModal";
import CustomLink from "../Common/Link";
import { useAuth } from "../../context/AuthContext";
import UserDropdown from "../../components/Mypage/UserDropdown"; // UserDropdown 컴포넌트 가져오기

const { Header } = Layout;

const CustomHeader: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const { login, logout, user } = useAuth(); // Context에서 로그인/로그아웃 상태 및 함수 불러오기

  // 로그인 버튼 클릭 시 모달 열기
  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsLoginModalVisible(false);
  };

  // 로그인 처리
  const handleLogin = (userData: { email: string; nick: string }) => {
    login(userData); // 로그인 함수 호출
    setIsLoginModalVisible(false); // 로그인 후 모달 닫기
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
        tooltip="Go to Home"
        style={{ marginRight: "16px" }} // 오른쪽에 간격 추가
      />

      {/* 오른쪽에 위치할 로그인/로그아웃 또는 유저 드롭다운 */}
      <div className="loginlogout">
        {/* 로그인 여부에 따라 버튼 변경 */}
        {user ? (
          // 로그인 상태: UserDropdown (마이페이지)
          <UserDropdown />
        ) : (
          // 로그아웃 상태: LoginOutlined 아이콘
          <Tooltip title="Login">
            <LoginOutlined
              onClick={handleLoginClick}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          </Tooltip>
        )}
      </div>

      {/* 로그인 모달 */}
      <LoginModal visible={isLoginModalVisible} onClose={handleCloseModal} />
    </Header>
  );
};

export default CustomHeader;
