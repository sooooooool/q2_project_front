import React from "react";
import { Modal } from "antd";
import naverImg from "../../assets/images/naver.png";
import kakaoImg from "../../assets/images/kakao.png";
import CloseIcon from "../../assets/images/Icon.svg";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      title={null} // 타이틀을 없앱니다.
      open={visible}
      onCancel={onClose}
      footer={null}
      width={380} // 모달의 너비를 380px로 설정합니다.
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "13px",
          height: "200px", // 모달의 높이를 200px로 설정합니다.
          padding: "20px", // 모달 내부에 패딩을 추가합니다.
          borderRadius: "10px", // 모달의 모서리를 둥글게 설정합니다.
          position: "relative", // 닫기 버튼 위치 조정을 위해 relative로 설정
        },
      }}
      closeIcon={
        // 닫기 버튼을 오른쪽 상단에 위치시킵니다.
        <span
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={onClose} // 버튼 클릭 시 모달을 닫습니다.
        >
          <img
            src={CloseIcon}
            alt="닫기"
            style={{ width: "16px", height: "16px" }}
          />
        </span>
      }
    >
      {/* 모달의 텍스트 섹션 */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "19px", marginBottom: "20px" }}>
          로그인이 필요한 서비스 입니다 :)
        </h2>
      </div>

      {/* 네이버와 카카오 로그인 버튼 섹션 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          width: "100%",
        }}
      >
        {/* 네이버 로그인 버튼 */}
        <button
          style={{
            backgroundImage: `url(${naverImg})`, // 네이버 로그인 이미지 삽입
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "150px",
            height: "75px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "transparent", // 버튼 배경 투명
          }}
          onClick={() => alert("네이버 로그인")}
        >
          <span style={{ visibility: "hidden" }}>네이버 로그인</span>
        </button>

        {/* 카카오 로그인 버튼 */}
        <button
          style={{
            backgroundImage: `url(${kakaoImg})`, // 카카오 로그인 이미지 삽입
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "150px",
            height: "75px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "transparent", // 버튼 배경 투명
          }}
          onClick={() => alert("카카오 로그인")}
        >
          <span style={{ visibility: "hidden" }}>카카오 로그인</span>
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
