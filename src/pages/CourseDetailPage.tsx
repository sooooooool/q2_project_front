import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Rate, Input, List, Row, Col } from "antd";
import { StarFilled, ArrowLeftOutlined } from "@ant-design/icons";
import * as I from "../assets/random";
import ExampleImage from "../assets/images/ExampleImage.png";
import HotPlaceIcon1 from "../assets/images/HotPlaceIcon1.svg";
import HotPlaceIcon2 from "../assets/images/HotPlaceIcon2.svg";
import HotPlaceIcon3 from "../assets/images/HotPlaceIcon3.svg";
import HotPlaceIcon4 from "../assets/images/HotPlaceIcon4.svg";
import SubmitIcon from "../assets/images/SubmitIcon.svg";
import axios from "axios";

// 코스 정보 타입 정의
type CourseDetail = {
  id: number;
  title: string;
  location: string;
  ratingCount: number;
  meanRating: number;
  stops: string[];
  imageUrl?: string;
  comments: { text: string; date: string }[];
};

// 핫플레이스 컴포넌트
const HotPlaceList: React.FC = () => {
  const hotPlaces = [
    { id: 1, name: "동구식당", icon: HotPlaceIcon1 },
    { id: 2, name: "소적두 성수점", icon: HotPlaceIcon2 },
    { id: 3, name: "디올 성수", icon: HotPlaceIcon3 },
    { id: 4, name: "스케줄 성수", icon: HotPlaceIcon4 },
  ];

  const displayedHotPlaces = hotPlaces.slice(0, 4); // 4개까지 표시

  return (
    <div>
      <Row gutter={[16, 16]}>
        {displayedHotPlaces.map((place) => (
          <Col span={24} key={place.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "stretch",
                padding: "16px",
                gap: "12px",
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
              }}
            >
              <img
                src={place.icon}
                alt={`icon-${place.id}`}
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                {place.name}
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// 댓글 리스트 컴포넌트
const CommentList: React.FC<{ comments: { text: string; date: string }[] }> = ({
  comments,
}) => (
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
            <List.Item.Meta description={comment.text} />
            <div>{comment.date}</div>
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
      onSubmit(); // 엔터키로 제출
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f7f7f7", // 박스 형태를 위한 배경색
        borderRadius: "10px", // 박스 형태의 둥근 테두리
        border: "1px solid #e0e0e0", // 박스 테두리
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "15px",
      }}
    >
      {/* 코스 평가 제목 */}
      <h3 style={{ margin: 0 }}>코스 평가</h3>

      {/* 별점 평가 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Rate value={rating} onChange={onRatingChange} />
      </div>

      {/* 댓글 작성 및 제출 섹션 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {/* 댓글 입력 필드 */}
        <Input
          value={review}
          onChange={onReviewChange}
          onKeyPress={handleKeyPress} // 엔터 키 입력 처리
          placeholder="댓글을 입력하세요"
          maxLength={150}
          style={{
            flex: 1, // 입력 필드가 가능한 넓게 차지하게 설정
            borderRadius: "10px",
            marginRight: "10px",
            border: "1px solid #e0e0e0",
          }}
        />
        {/* SVG 제출 버튼 */}
        <img
          src={SubmitIcon} // 제출 아이콘 (SVG)
          alt="제출"
          onClick={onSubmit} // 클릭하면 제출 함수 호출
          style={{
            width: "32px", // 아이콘 크기
            height: "32px",
            cursor: "pointer", // 마우스 커서가 버튼처럼 보이도록 설정
          }}
        />
      </div>
    </div>
  );
};

// 코스 이미지 컴포넌트
const CourseImage: React.FC<{ imageUrl?: string }> = ({ imageUrl }) => (
  <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}>
    <img
      src={imageUrl || I.randomImage(800, 600)}
      alt="Course"
      style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
    />
  </div>
);

// 코스 상세 페이지 컴포넌트
const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>(); // URL에서 courseId 받아옴
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [comments, setComments] = useState<{ text: string; date: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [userReview, setUserReview] = useState(""); // 사용자 리뷰 상태
  const [userRating, setUserRating] = useState(3); // 기본값 3점
  const [inProp, setInProp] = useState(true);

  const handleBack = () => {
    // 슬라이드 애니메이션을 시작하기 위해 inProp을 false로 설정
    setInProp(false);
    // 일정 시간이 지난 후 페이지 이동
    setTimeout(() => {
      // 페이지 이동
      window.location.href = "/course-select"; // 또는 react-router-dom의 history.push를 사용 가능
    }, 300); // 애니메이션 시간과 맞춰서 설정
  };
  // 백엔드에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/course-api/:${courseId}`);
        setCourse(response.data);
        setComments(response.data.comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleReviewSubmit = () => {
    if (userReview.trim() === "") return;
    const newComment = {
      text: userReview,
      date: new Date().toISOString().split("T")[0],
    };
    setComments([newComment, ...comments]); // 새로운 댓글을 추가
    setUserReview(""); // 입력 필드를 초기화
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserReview(e.target.value); // 이벤트에서 입력된 값으로 상태 업데이트
  };

  if (loading) return <div>Loading...</div>; // 로딩 중일 때 로딩 표시

  return (
    <div
      style={{
        padding: "16px",
        position: "relative",
        marginTop: "40px",
      }}
    >
      {/* 닫기 버튼 */}
      <Link to="/course">
        <span
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            cursor: "pointer",
            zIndex: 10,
          }}
          aria-label="닫기 버튼"
        >
          <ArrowLeftOutlined style={{ fontSize: "16px", color: "black" }} />{" "}
        </span>
      </Link>

      {/* 코스 이미지 */}
      <div style={{ borderRadius: "15px" }}>
        <CourseImage imageUrl={course?.imageUrl} />
      </div>

      {/* 코스 제목 및 별점 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            {course?.title.slice(0, 12)}{" "}
            {course?.ratingCount ? `(${course.ratingCount})` : ""} {/* 제목 */}
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "16px", color: "#FFD700" }}>
            {course?.meanRating.toFixed(1)} <StarFilled />
          </span>
        </div>
      </div>

      {/* 핫플레이스 섹션 */}
      <div style={{ margin: "20px 0" }}>
        <HotPlaceList />
      </div>

      {/* 코스 경로 이미지 */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2
          style={{ fontSize: "20px", textAlign: "left", marginBottom: "10px" }}
        >
          코스 경로
        </h2>
        <img
          src={ExampleImage}
          alt="Course Route"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>

      {/* 댓글 섹션 */}
      <CommentList comments={comments} />

      {/* 코스 평가 섹션 */}
      <CourseRating
        rating={userRating}
        onRatingChange={setUserRating}
        review={userReview}
        onReviewChange={handleReviewChange}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default CourseDetailPage;

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
