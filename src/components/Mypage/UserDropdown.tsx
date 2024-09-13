import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  CommentOutlined,
  FileOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext"; // 사용자 정보 가져오기
import { useNavigate } from "react-router-dom";

const UserDropdown: React.FC = () => {
  // UserDropdown 컴포넌트
  const { user, logout } = useAuth(); // 사용자 정보와 로그아웃 함수 가져오기
  const navigate = useNavigate();

  // 메뉴 항목 클릭 시 실행되는 함수
  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case "viewCourses":
        navigate("/my-courses");
        break;
      case "viewComments":
        navigate("/my-comments");
        break;
      case "editNickname":
        navigate("/edit-nickname");
        break;
      case "logout":
        logout();
        break;
      default:
        break;
    }
  };

  // 드롭다운 메뉴 정의
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="viewCourses" icon={<FileOutlined />}>
        내가 만든 코스 보기
      </Menu.Item>
      <Menu.Item key="viewComments" icon={<CommentOutlined />}>
        내가 쓴 댓글 보기
      </Menu.Item>
      <Menu.Item key="editNickname" icon={<EditOutlined />}>
        닉네임 바꾸기
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    // 아이콘 클릭 시 드롭다운이 열리도록 설정
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight" arrow>
      <UserOutlined
        style={{ fontSize: "24px", cursor: "pointer" }} // 아이콘 스타일 설정
        title={user?.nick || "사용자"} // 툴팁으로 사용자 닉네임을 표시
      />
    </Dropdown>
  );
};

export default UserDropdown;
