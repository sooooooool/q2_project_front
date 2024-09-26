import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Rate, Input, List, Row, Col } from "antd";
import { StarFilled, ArrowLeftOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import * as I from "../assets/random";
import axios from "axios";
import ExampleImage from "../assets/images/ExampleImage.png";
import HotPlaceIcon1 from "../assets/images/HotPlaceIcon1.svg";
import HotPlaceIcon2 from "../assets/images/HotPlaceIcon2.svg";
import HotPlaceIcon3 from "../assets/images/HotPlaceIcon3.svg";
import HotPlaceIcon4 from "../assets/images/HotPlaceIcon4.svg";
import SubmitIcon from "../assets/images/SubmitIcon.svg";
import { encode2queryData } from "../services/encode"; // 인코딩 함수 불러오기
import { useAuth } from "../context/AuthContext";

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
  spots: spotUseCourse[]; // 핫플레이스에 사용할 spots 추가
};

// 핫플레이스 컴포넌트 - spots 데이터를 활용
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
                alt={`icon-${index}`}
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                {place.Spot_Name}
              </span>
              <span>({place.Category})</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// 댓글 리스트 컴포넌트 - CommentList를 course.comment로 채울 예정
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
            <List.Item.Meta description={comment.comment_content} />
            <div>{comment.createdAt}</div>
            <div>{comment.nickname}</div>
            <div>{comment.starPoint}점</div>
          </List.Item>
        )}
      />
    )}
  </div>
);

// 코스 평가 컴포넌트 - 리뷰 제출 핸들러에서 댓글을 백엔드에 업데이트하고 불러올 예정
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

// 코스 이미지 컴포넌트 - imageUrlList 배열을 순회하여 각 이미지를 표시

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
  const { courseId } = useParams<{ courseId: string }>(); // URL에서 courseId 받아옴
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [comments, setComments] = useState<
    {
      comment_content: string;
      createdAt: string;
      nickname: string;
      starPoint: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [userReview, setUserReview] = useState(""); // 사용자 리뷰 상태
  const [userRating, setUserRating] = useState(3); // 기본값 3점
  const [inProp, setInProp] = useState(true);
  const { user } = useAuth(); // 사용자 정보 가져오기
  const navigate = useNavigate();

  const handleBack = () => {
    setInProp(false);
    setTimeout(() => {
      window.location.href = "/course-select";
    }, 300);
  };

  // 백엔드에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/course-api/${courseId}`);
        console.log(response.data);
        setCourse(response.data);
        setComments(response.data.comment);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  // 리뷰 제출 핸들러 - 리뷰 제출 후 백엔드로 업데이트 요청 후 댓글 갱신
  const handleReviewSubmit = async () => {
    if (userReview.trim() === "") return;
    try {
      await axios.post(`/comment-api/`, {
        comment_content: userReview,
        starPoint: userRating,
        F_User_id: user?.id,
        F_Course_id: courseId,
      });
    } catch (error) {
        console.error("Error submitting review:", error);
      }
    try {
      await axios.put(`/course-api/starpoint/${courseId}`, {
        addStarPoint: userRating
      });
    } catch (error) {
        console.error("Error updating review:", error);
      }
      setUserReview(""); // 입력 필드를 초기화
      navigate(`/course-detail/${courseId}`); // 코스 상세 페이지로 이동
      // 새로운 댓글 데이터 가져오기
    //   const query = { course: courseId };
    //   console.log("This is query: ",query);
    //   const encodedQuery = encode2queryData(query); // 쿼리 데이터 인코딩

    // try {
    //   const response = await axios.get(`/comment-api?data=${encodedQuery}`);
    //   console.log("This is comment Get data: ",response.data);
    //   setComments(response.data.comments);
    //   setUserReview(""); // 입력 필드를 초기화
    // } catch (error) {
    //   console.error("Error submitting review:", error);
    // }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserReview(e.target.value);
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

      {/* 코스 이미지 섹션 - course의 imageUrlList 데이터를 처리 */}
      <div style={{ borderRadius: "15px" }}>
        {course?.imageUrlList && (
          <CourseImage imageUrlList={course.imageUrlList} />
        )}
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
            {course?.countStarPoint ? `(${course.countStarPoint})` : ""}
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "16px", color: "#FFD700" }}>
            {course?.meanStarPoint.toFixed(1)} <StarFilled />
          </span>
        </div>
      </div>

      {/* 핫플레이스 섹션 - course.spots의 데이터를 핫플레이스에 사용 */}
      <div style={{ margin: "20px 0" }}>
        {course?.spots && <HotPlaceList spots={course.spots} />}
      </div>

      {/* 코스 경로 이미지 */}
      {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", textAlign: "left", marginBottom: "10px" }}>
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
      </div> */}

      {/* 댓글 섹션 - course.comment의 내용으로 채움 */}
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
