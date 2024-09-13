import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Rate, Input, List } from "antd";
import { StarFilled } from "@ant-design/icons";
import * as I from "../assets/random";
import ExampleImage from "../assets/images/ExampleImage.png";
import CloseIcon from "../assets/images/Icon.svg";

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
    <div>
      <h3>코스 평가</h3>
      <Rate value={rating} onChange={onRatingChange} />
      <Input
        value={review}
        onChange={onReviewChange}
        onKeyPress={handleKeyPress} // 엔터 키 입력 처리
        placeholder="댓글을 입력하세요"
        maxLength={150}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      />
      <Button type="primary" onClick={onSubmit}>
        제출
      </Button>
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

  // 백엔드에서 데이터 가져오기
  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setComments(data.comments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setLoading(false);
      });
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
    <div style={{ padding: "16px", position: "relative" }}>
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
        >
          <img
            src={CloseIcon}
            alt="닫기"
            style={{ width: "16px", height: "16px" }}
          />
        </span>
      </Link>

      {/* 코스 이미지 */}
      <CourseImage imageUrl={course?.imageUrl} />

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
            {course?.title.slice(0, 12)} ({course?.ratingCount}){/* 제목 */}
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "16px", color: "#FFD700" }}>
            {course?.meanRating.toFixed(1)} <StarFilled />
          </span>
        </div>
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
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
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
