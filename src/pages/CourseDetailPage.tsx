import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Link 사용
import { Row, Col, Button, Rate, Input, List } from "antd";
import { StarFilled, CloseOutlined } from "@ant-design/icons";
import * as I from "../assets/random";
import ExampleImage from "../assets/images/ExampleImage.png"; // 경로 이미지 가져오기

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

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>(); // URL에서 courseId 받아옴

  const [course, setCourse] = useState<CourseDetail | null>(null); // 코스 정보를 저장하는 상태
  const [comments, setComments] = useState<{ text: string; date: string }[]>(
    []
  );

  useEffect(() => {
    // 더미 데이터 또는 API 호출하여 courseId에 해당하는 코스 정보 불러오기

    const fetchedCourse: CourseDetail = {
      id: parseInt(courseId || "1"),
      title: "코스 제목",
      location: "성수",
      ratingCount: 12,
      meanRating: 4.3,
      stops: [
        "코스 설명 페이지입니다",
        "코스 설명 페이지입니다",
        "코스 설명 페이지입니다",
      ],
      imageUrl: undefined, // 이미지 미등록 시 undefined
      comments: [
        { text: "좋은 코스였어요!", date: "2024-09-01" },
        { text: "재미있었습니다.", date: "2024-09-02" },
      ],
    };
    setCourse(fetchedCourse); // 코스 데이터 설정
    setComments(fetchedCourse.comments); // 코스의 댓글을 설정
  }, []);

  const [userReview, setUserReview] = useState(""); // 사용자 리뷰 상태
  const [userRating, setUserRating] = useState(3); // 기본값 3점

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserReview(e.target.value);
  };

  const handleReviewSubmit = () => {
    if (userReview.trim() === "") return;
    const newComment = {
      text: userReview,
      date: new Date().toISOString().split("T")[0],
    };
    setComments([newComment, ...comments]); // 최신순으로 추가
    setUserReview("");
  };

  if (!course) return <div>Loading...</div>; // 코스 정보가 로드될 때까지 로딩 표시

  return (
    <div style={{ padding: "16px" }}>
      {/* 닫기 버튼 */}
      <Link to="/courses">
        <Button icon={<CloseOutlined />} style={{ float: "right" }}></Button>
      </Link>

      {/* 코스 이미지 */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={course.imageUrl || I.randomImage(800, 600)} // 이미지가 없는 경우 랜덤 이미지
          alt="Course"
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
        />
      </div>

      {/* 코스 제목과 평점 */}
      <Row justify="space-between" align="middle">
        <Col>
          <h2>
            {course.title.slice(0, 12)} ({course.ratingCount})
          </h2>
        </Col>
        <Col>
          <span style={{ fontSize: "24px", color: "#FFD700" }}>
            {course.meanRating.toFixed(1)} <StarFilled />
          </span>
        </Col>
      </Row>

      {/* 핫플 리스트 */}
      <div style={{ marginBottom: "20px" }}>
        {course.stops.slice(0, 4).map((stop, index) => (
          <div key={index}>{stop}</div>
        ))}
      </div>

      {/* 경로 이미지 */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={ExampleImage}
          alt="Course Route"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      </div>

      {/* 댓글 섹션 */}
      <div style={{ marginBottom: "20px" }}>
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

      {/* 코스 평가 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>코스 평가</h3>
        <Rate value={userRating} onChange={setUserRating} />
        <Input
          value={userReview}
          onChange={handleReviewChange}
          placeholder="댓글을 입력하세요"
          maxLength={150}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <Button type="primary" onClick={handleReviewSubmit}>
          제출
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailPage;

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
