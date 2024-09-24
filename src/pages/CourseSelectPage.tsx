import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Dropdown,
  Input,
  Pagination,
  FloatButton,
  message,
} from "antd";
import { DownOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import CustomLink from "../components/Common/Link";
import CourseCard from "../components/Course/Course";
import * as I from "../assets/random";
import { useAuth } from "../hooks/useAuth"; // 커스텀 훅으로 AuthContext 사용
import { CourseSummary } from "../types";
import { encode2queryData } from "../services/encode";

const pageSize = 5; // 한 페이지에 표시할 코스의 수

interface queryData {
  location?: number;
  sortBy?: string;
  user?: number;
  limit?: number;
  offset?: number;
  direction?: string;
}

// 코스를 정렬하는 함수
const sortCourses = (courses: any, sortOrder: any) => {
  switch (sortOrder) {
    case "latest":
      return [...courses].sort((a, b) => b.time - a.time);
    case "rating":
      return [...courses].sort((a, b) =>
        b.meanrating === a.meanrating
          ? a.title.localeCompare(b.title)
          : b.meanrating - a.meanrating
      );
    default:
      return courses;
  }
};

// 페이지네이션 및 코스 정렬을 처리하는 함수
const getPaginatedCourses = (
  courses: CourseSummary[],
  sortOrder: string,
  currentPage: number,
  pageSize: number
) => {
  const sortedCourses = sortCourses(courses, sortOrder);
  return sortedCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
};

const CourseSelectPage = () => {
  const { user } = useAuth(); // AuthContext에서 로그인 상태를 가져옴
  const [sortOrder, setSortOrder] = useState("latest"); // 기본 정렬을 최신순으로 설정
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [location, setLocation] = useState<number | null>(() => {
    const query = new URLSearchParams(window.location.search);
    return Number(query.get("value")) || 1;
  }); // 검색한 위치 정보
  const [courses, setCourses] = useState<Array<CourseSummary>>([]); // 코스 데이터를 저장하는 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [pageTotal, setPageTotal] = useState(0);
  const locationData = {
    1: "성수",
    2: "홍대",
    3: "합정",
    4: "강남",
    5: "신촌",
    6: "건대",
  };

  // 코스 데이터를 API에서 가져오는 함수
  const fetchCourses = async (data: queryData) => {
    setLoading(true); // 로딩 상태 시작
    setError(null); // 기존 에러 초기화
    try {
      // 기존 더미 데이터 대신 API 요청으로 대체
      console.log("This is queryDAta : ", data);
      const response = await axios.get(
        `/course-api?data=${encode2queryData(data)}`
      ); // API 요청
      const { modifiedCourses, total } = response.data;
      setPageTotal(total);
      const getCourses = modifiedCourses.map((course: any) => ({
        id: course.id,
        title: course.title,
        userName: course.userName,
        // location: course.location,
        tags: course.tags,
        imageUrl: course.imageUrl || I.randomImage(800, 600),
        // time: course.createdAt,
        meanrating: course.meanStartPoint,
      }));
      console.log("This is response data Courses : ", getCourses);
      setCourses(getCourses); // 받아온 코스 데이터 상태에 저장
    } catch (err) {
      setError("코스 데이터를 불러오는 데 실패했습니다.");
      message.error("코스 데이터를 불러오는 데 문제가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  // location, currentPage, sortOrder가 변경될 때마다 fetchCourses 호출
  useEffect(() => {
    if (location !== null) {
      fetchCourses({ location: location });
    }
  }, [location, currentPage, sortOrder]);

  // 더미 코스 데이터
  // const courses = [
  //   {
  //     id: 1,
  //     title: "코스 제목 1",
  //     userName: "유저 닉네임 1",
  //     tags: ["#맛집", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 4.0,
  //     ratingCount: 10,
  //   },
  //   {
  //     id: 2,
  //     title: "코스 제목 2",
  //     userName: "유저 닉네임 2",
  //     tags: ["#카페", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 3.5,
  //     ratingCount: 5,
  //   },
  //   {
  //     id: 3,
  //     title: "코스 제목 3",
  //     userName: "유저 닉네임 3",
  //     tags: ["#맛집", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 4.5,
  //     ratingCount: 20,
  //   },
  //   {
  //     id: 4,
  //     title: "코스 제목 4",
  //     userName: "유저 닉네임 4",
  //     tags: ["#카페", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 3.0,
  //     ratingCount: 2,
  //   },
  //   {
  //     id: 5,
  //     title: "코스 제목 5",
  //     userName: "유저 닉네임 5",
  //     tags: ["#카페", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 3.0,
  //     ratingCount: 2,
  //   },
  //   {
  //     id: 6,
  //     title: "코스 제목 6",
  //     userName: "유저 닉네임 6",
  //     tags: ["#카페", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 3.0,
  //     ratingCount: 2,
  //   },
  //   {
  //     id: 7,
  //     title: "코스 제목 7",
  //     userName: "유저 닉네임 7",
  //     tags: ["#카페", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 3.0,
  //     ratingCount: 2,
  //   },
  //   {
  //     id: 8,
  //     title: "코스 제목 8",
  //     userName: "유저 닉네임 8",
  //     tags: ["#카페", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 3.0,
  //     ratingCount: 2,
  //   },
  //   {
  //     id: 9,
  //     title: "코스 제목 9",
  //     userName: "유저 닉네임 9",
  //     tags: ["#카페", "#산책"],
  //     imageUrl: I.randomImage(800, 600),
  //     time: 5,
  //     comments: 20,
  //     likes: 20,
  //     meanrating: 3.0,
  //     ratingCount: 2,
  //   },
  // ];

  // 필터 메뉴 설정
  const menuItems = [
    { label: "최신순", key: "latest" },
    { label: "평점순", key: "rating" },
  ];

  // 필터 메뉴 클릭 핸들러
  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    setSortOrder(e.key); // 정렬 순서 변경
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page); // 페이지 변경
  };

  // 현재 페이지에 맞는 코스 추출
  const paginatedCourses = getPaginatedCourses(
    courses,
    sortOrder,
    currentPage,
    pageSize
  );

  return (
    <>
      {/* 상단 필터 영역 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          fontSize: "17px",
          fontWeight: "bold",
        }}
      >
        <div style={{ position: "absolute", right: 0, padding: "0px 50px" }}>
          <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
            <a onClick={(e) => e.preventDefault()} style={{ color: "black" }}>
              {sortOrder === "latest" ? "최신순" : "평점순"} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>

      {/* 검색 인풋 필드 */}
      <div
        style={{
          padding: "12px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        <Input
          prefix={<SearchOutlined />}
          placeholder="코스명 또는 태그로 검색"
          maxLength={40}
          style={{
            backgroundColor: "#f5f5f5",
            padding: "8px 30px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            height: "50px",
            fontSize: "14px",
          }}
        />
      </div>

      {/* 코스 리스트 */}
      <Row
        justify="center"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col xs={24} sm={22}>
          {loading ? (
            <div>로딩 중...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            paginatedCourses.map((course: CourseSummary) => (
              <CustomLink
                key={course.id}
                to={`/course/${course.id}`}
                icon={
                  <CourseCard
                    id={course.id}
                    title={course.title}
                    userName={course.userName}
                    tags={course.tags}
                    imageUrl={course.imageUrl}
                    meanrating={course.meanrating}
                  />
                }
              />
            ))
          )}
        </Col>
      </Row>

      {/* 페이지네이션 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          marginBottom: "40px",
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={pageTotal}
          onChange={handlePageChange}
        />
      </div>

      {/* 코스 생성 페이지로 이동하는 플로팅 버튼 */}
      {
        user ? (
          <CustomLink
            to="/course/create"
            icon={
              <FloatButton
                icon={<PlusOutlined />}
                type="primary"
                tooltip="Create Course"
                style={{ right: 24, bottom: 24 }}
              />
            }
          />
        ) : null /* 로그인되지 않은 경우에는 버튼이 보이지 않음 */
      }
    </>
  );
};

export default CourseSelectPage;
