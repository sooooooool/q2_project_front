import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Dropdown,
  Input,
  Pagination,
  FloatButton,
  message,
  Spin,
  List,
} from "antd";
import { DownOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CustomLink from "../components/Common/Link";
import CourseCard from "../components/Course/Course";
import { useAuth } from "../hooks/useAuth"; // AuthContext를 위한 커스텀 훅
import { CourseSummary } from "../types";
import useFetchCourses from "../hooks/useFetchCourses"; // 코스 데이터 페칭 커스텀 훅/

const CourseSelectPage = () => {
  const { user } = useAuth(); // AuthContext에서 로그인 상태 가져오기
  const [sortOrder, setSortOrder] = useState("latest"); // 기본 정렬 순서
  const [location, setLocation] = useState<number>(() => {
    const query = new URLSearchParams(window.location.search);
    return Number(query.get("value")) || 1;
  }); // 검색된 위치 정보
  const {
    courses,
    loading,
    error,
    total,
    currentPage,
    setCurrentPage,
    fetchData,
    pageSize,
  } = useFetchCourses(); // 커스텀 훅 사용

  // location, currentPage, sortOrder가 변경될 때마다 데이터 페칭
  useEffect(() => {
    fetchData({
      location: location,
      page: currentPage,
      pageSize: pageSize,
    });
  }, [location, currentPage]);

  // 필터 메뉴 아이템
  const menuItems = [
    { label: "최신순", key: "latest" },
    { label: "평점순", key: "rating" },
  ];

  // 필터 메뉴 클릭 핸들러
  const handleMenuClick = (e: { key: string }) => {
    setSortOrder(e.key); // 정렬 순서 업데이트
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 현재 페이지 업데이트
  };

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
            <Spin />
          ) : error ? (
            <div>코스 데이터를 불러오는 데 실패했습니다.</div>
          ) : (
            <List
              dataSource={courses}
              renderItem={(course: CourseSummary) => (
                <List.Item key={course.id}>
                  <CustomLink
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
                </List.Item>
              )}
            />
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
          total={total}
          pageSize={pageSize}
          onChange={handlePageChange}
          style={{
            textAlign: "center",
            marginTop: "16px",
            justifyContent: "center",
          }}
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
        ) : null /* 로그인되지 않은 경우 버튼 숨김 */
      }
    </>
  );
};

export default CourseSelectPage;
