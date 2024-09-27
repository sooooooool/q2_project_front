import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Rate, Input, List, Row, Col } from "antd";
import { StarFilled, ArrowLeftOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import SubmitIcon from "../assets/images/SubmitIcon.svg";
import HotPlaceIcon1 from "../assets/images/HotPlaceIcon1.svg";
import HotPlaceIcon2 from "../assets/images/HotPlaceIcon2.svg";
import HotPlaceIcon3 from "../assets/images/HotPlaceIcon3.svg";
import HotPlaceIcon4 from "../assets/images/HotPlaceIcon4.svg";
import LoginModal from "../components/Common/LoginModal";

// 인터페이스 정의
export interface spotUseCourse {
  id: number;
  Spot_Name: string;
  Category: string;
  icon: string;
}

export type CourseDetail = {
  id: number;
  nickname: string;
  title: string;
  location: string;
  meanStarPoint: number;
  countStarPoint: number;
  stops: string[];
  imageUrlList?: string[];
  content: string;
  updatedAt: string;
  comments: {
    comment_content: string;
    createdAt: string;
    nickname: string;
    starPoint: number;
  }[];
  spots: spotUseCourse[];
};

// 한국 시간으로 포맷하는 함수
const formatDateToKST = (dateString: string) => {
  const date = new Date(dateString);
  const kstOffset = 9 * 60 * 60 * 1000; // UTC+9 시간
  const kstDate = new Date(date.getTime() + kstOffset);

  const formattedDate = `${kstDate.getFullYear()}.${(
    "0" +
    (kstDate.getMonth() + 1)
  ).slice(-2)}.${("0" + kstDate.getDate()).slice(-2)} ${kstDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${kstDate.getMinutes().toString().padStart(2, "0")}`;
  return formattedDate;
};

// 핫플레이스 컴포넌트
const HotPlaceList: React.FC<{ spots: spotUseCourse[] }> = ({ spots }) => {
  const displayedHotPlaces = spots.slice(0, 4); // 최대 4개의 핫플레이스만 표시
  spots.forEach((spot, index) => {
    switch (index) {
      case 0:
        spot.icon = HotPlaceIcon1;
        break;
      case 1:
        spot.icon = HotPlaceIcon2;
        break;
      case 2:
        spot.icon = HotPlaceIcon3;
        break;
      case 3:
        spot.icon = HotPlaceIcon4;
        break;
      default:
        spot.icon = "";
    }
  });

  return (
    <div>
      <Row gutter={[16, 16]}>
        {displayedHotPlaces.map((place, index) => (
          <Col span={24} key={place.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                gap: "12px",
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
              }}
            >
              <img
                src={place.icon}
                alt={`icon-${index}`}
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                {place.Spot_Name}
              </span>
              {/* <span>({place.Category})</span> */}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// 댓글 리스트 컴포넌트
const CommentList: React.FC<{
  comments: {
    comment_content: string;
    createdAt: string;
    nickname: string;
    starPoint: number;
  }[];
}> = ({ comments }) => (
  <div>
    <h3>댓글</h3>
    {comments.length === 0 ? (
      <div
        style={{
          padding: "16px",
          backgroundColor: "#f0f0f0",
          textAlign: "center",
        }}
      >
        아직 등록된 댓글이 없어요. 첫 댓글을 남겨보세요!
      </div>
    ) : (
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              title={
                <>
                  <strong>{comment.nickname}</strong>
                  <Rate
                    value={comment.starPoint}
                    disabled
                    style={{ fontSize: "16px", marginLeft: "8px" }}
                  />
                </>
              }
              description={
                <>
                  <div style={{ marginBottom: "8px" }}>
                    {comment.comment_content}
                  </div>
                  <span style={{ color: "gray", fontSize: "12px" }}>
                    {formatDateToKST(comment.createdAt)}
                  </span>
                </>
              }
            />
          </List.Item>
        )}
      />
    )}
  </div>
);

// 코스 평가 컴포넌트
const CourseRating: React.FC<{
  rating: number;
  onRatingChange: (value: number) => void;
  review: string;
  onReviewChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}> = ({ rating, onRatingChange, review, onReviewChange, onSubmit }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f7f7f7",
        borderRadius: "10px",
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "15px",
      }}
    >
      <h3 style={{ margin: 0 }}>코스 평가</h3>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Rate value={rating} onChange={onRatingChange} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Input
          value={review}
          onChange={onReviewChange}
          onKeyPress={handleKeyPress}
          placeholder="댓글을 입력하세요"
          maxLength={150}
          style={{
            flex: 1,
            borderRadius: "10px",
            marginRight: "10px",
            border: "1px solid #e0e0e0",
          }}
        />
        <img
          src={SubmitIcon}
          alt="제출"
          onClick={onSubmit}
          style={{ width: "32px", height: "32px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

// 코스 이미지 컴포넌트
const CourseImage: React.FC<{ imageUrlList: string[] }> = ({
  imageUrlList,
}) => (
  <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}>
    {imageUrlList.length === 0 ? (
      <img
        src={"/" + imageUrlList[0]}
        alt={"Course"}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          marginBottom: "10px",
        }}
      />
    ) : (
      <Carousel arrows>
        {imageUrlList.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={"/" + imageUrl}
              alt={`Course`}
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          </div>
        ))}
      </Carousel>
    )}
  </div>
);

// 코스 상세 페이지 컴포넌트
const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [comments, setComments] = useState<
    {
      comment_content: string;
      createdAt: string;
      nickname: string;
      starPoint: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(3);
  const { user } = useAuth();
  const [commentChange, setCommentChange] = useState(1);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  // 로그인 버튼 클릭 시 모달 열기
  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsLoginModalVisible(false);
  };

  const handleBack = () => {
    setTimeout(() => {
      window.location.href = "/course-select";
    }, 300);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/course-api/${courseId}`);
        setCourse(response.data);
        setComments(response.data.comment);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, commentChange]);

  const handleReviewSubmit = async () => {
    if (userReview.trim() === "") return;
    try {
      await axios.post(`/comment-api/`, {
        comment_content: userReview,
        starPoint: userRating,
        F_User_id: user?.id,
        F_Course_id: courseId,
      });
      await axios.put(`/course-api/starpoint/${courseId}`, {
        addStarPoint: userRating,
      });
      setUserReview("");
      setCommentChange((prev) => prev + 1); // 코멘트 갱신
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserReview(e.target.value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "16px", position: "relative", marginTop: "40px" }}>
      <Link to="/course">
        <span
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: "16px", color: "black" }} />{" "}
        </span>
      </Link>

      {course?.imageUrlList && (
        <CourseImage imageUrlList={course.imageUrlList} />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {course?.title.slice(0, 12)}
          </h1>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px", // 제목과 태그 사이 간격 추가
        }}
      >
        <div>
          {course?.spots.map((spot) => (
            <span
              style={{
                fontSize: "14px",
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                padding: "5px 10px", // 패딩 추가
                marginRight: "5px",
              }}
            >
              #{spot.Category}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "16px", color: "#FFD700" }}>
            {course?.meanStarPoint.toFixed(1)} <StarFilled />
          </span>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          backgroundColor: "#f7f7f7", // 회색 배경 추가
          borderRadius: "10px", // 모서리 둥글기 추가
          padding: "16px", // 내용에 패딩 추가
          marginTop: "15px", // 코스 내용과 스팟 사이 간격 추가
        }}
      >
        <p style={{ marginBlockStart: 0, marginBlockEnd: "2px" }}>
          {course?.content}
        </p>
      </div>

      {course?.spots && (
        <div style={{ marginTop: "15px" }}>
          {" "}
          {/* 코스와 스팟 사이 간격 추가 */}
          <HotPlaceList spots={course.spots} />
        </div>
      )}

      <CommentList comments={comments} />

      {user ? (
        <CourseRating
          rating={userRating}
          onRatingChange={setUserRating}
          review={userReview}
          onReviewChange={handleReviewChange}
          onSubmit={handleReviewSubmit}
        />
      ) : (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            border: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>코스 평가</h3>
          <p>로그인 후에 평가를 작성할 수 있습니다.</p>
          <Button type="primary" onClick={handleLoginClick}>
            로그인
          </Button>
        </div>
      )}
      <LoginModal visible={isLoginModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default CourseDetailPage;
