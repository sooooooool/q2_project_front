import React, { useState } from "react";
import { Layout, Tooltip } from "antd";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import LoginModal from "../Common/LoginModal";
import CustomLink from "../Common/Link";
import { useAuth } from "../../context/AuthContext";
import UserDropdown from "../MyPage/UserDropdown";

const { Header } = Layout;

// 지역 데이터 (번호에 따른 지역명)
const locationData: { [key: number]: string } = {
  1: "성수",
  2: "홍대",
  3: "합정",
  4: "강남",
  5: "신촌",
  6: "건대",
};

// 헤더 컴포넌트
const CustomHeader: React.FC = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // location.search에서 value 값을 추출해 해당 지역명을 반환
  const getLocationName = (): string | null => {
    const params = new URLSearchParams(location.search);
    const value = params.get("value");

    // value를 숫자로 변환하고 해당 값이 locationData에 존재하는지 확인
    const numValue = Number(value);
    if (numValue in locationData) {
      return locationData[numValue]; // 해당 값이 있으면 지역명 반환
    }
    return ""; // 값이 없거나 유효하지 않은 경우 빈 문자열 반환
  };

  // 로그인 모달 처리 함수
  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalVisible(false);
  };

  // 스타일 정의
  const headerStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100px",
    padding: "0 70px",
    margin: "20px 0",
    position: "relative",
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "24px",
    color: "black",
  };

  const iconWrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "480px",
  };

  const titleStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0",
    textAlign: "center",
  };

  return (
    <Header style={headerStyle}>
      {/* 왼쪽 홈 아이콘 */}
      <div style={iconWrapperStyle}>
        <CustomLink
          to="/"
          icon={<HomeOutlined style={iconStyle} />}
          tooltip="Go to Home"
        />

        {/* 오른쪽 로그인/로그아웃 또는 유저 드롭다운 */}
        <div className="loginlogout">
          {user ? (
            <UserDropdown />
          ) : (
            <Tooltip title="Login">
              <LoginOutlined
                onClick={handleLoginClick}
                style={{ fontSize: "24px", cursor: "pointer" }}
              />
            </Tooltip>
          )}
        </div>
      </div>

      {/* 가운데 지역명 표시 (value 값이 있을 때만) */}
      {getLocationName() && <div style={titleStyle}>{getLocationName()}</div>}

      {/* 로그인 모달 */}
      <LoginModal visible={isLoginModalVisible} onClose={handleCloseModal} />
    </Header>
  );
};

export default CustomHeader;
