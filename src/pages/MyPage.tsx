import React from "react";
import { Menu, Dropdown, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  CommentOutlined,
  FileOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext"; // AuthContext에서 사용자 정보 가져오기
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
  const { user, logout } = useAuth(); // 사용자 정보와 로그아웃 함수 가져오기
  const navigate = useNavigate();

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
    }
  };

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

  if (!user) {
    return <Button onClick={() => navigate("/login")}>로그인</Button>;
  }

  return (
    <div>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        placement="bottomRight"
        arrow
      >
        <Button
          icon={<UserOutlined />}
          style={{ fontSize: "16px", cursor: "pointer" }}
        >
          {user?.nick || "사용자"}
        </Button>
      </Dropdown>
    </div>
  );
};

export default MyPage;
