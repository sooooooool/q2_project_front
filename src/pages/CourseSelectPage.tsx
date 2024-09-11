import React, { useState } from "react";
import { Row, Col, Dropdown, Input, Pagination, FloatButton } from "antd";
import { DownOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CustomLink from "../components/Common/Link";
import CourseCard from "../components/Course/Course";
import * as I from "../assets/random";
import { useAuth } from "../hooks/useAuth"; // 커스텀 훅으로 AuthContext 사용

const pageSize = 5; // 한 페이지에 표시할 코스의 수

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
  courses: any[],
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

  // 더미 코스 데이터
  const courses = [
    {
      id: 1,
      title: "코스 제목 1",
      userName: "유저 닉네임 1",
      tags: ["#맛집", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 4.0,
      ratingCount: 10,
    },
    {
      id: 2,
      title: "코스 제목 2",
      userName: "유저 닉네임 2",
      tags: ["#카페", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.5,
      ratingCount: 5,
    },
    {
      id: 3,
      title: "코스 제목 3",
      userName: "유저 닉네임 3",
      tags: ["#맛집", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 4.5,
      ratingCount: 20,
    },
    {
      id: 4,
      title: "코스 제목 4",
      userName: "유저 닉네임 4",
      tags: ["#카페", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },
    {
      id: 5,
      title: "코스 제목 5",
      userName: "유저 닉네임 5",
      tags: ["#카페", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },
    {
      id: 6,
      title: "코스 제목 6",
      userName: "유저 닉네임 6",
      tags: ["#카페", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },
    {
      id: 7,
      title: "코스 제목 7",
      userName: "유저 닉네임 7",
      tags: ["#카페", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },
    {
      id: 8,
      title: "코스 제목 8",
      userName: "유저 닉네임 8",
      tags: ["#카페", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },
    {
      id: 9,
      title: "코스 제목 9",
      userName: "유저 닉네임 9",
      tags: ["#카페", "#산책"],
      imageUrl: I.randomImage(800, 600),
      time: 5,
      comments: 20,
      likes: 20,
      meanrating: 3.0,
      ratingCount: 2,
    },
  ];

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
          padding: "16px",
          position: "relative",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>성수</div>
        <div style={{ position: "absolute", right: 0, top: "40px" }}>
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
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Input
          prefix={<SearchOutlined />}
          placeholder="코스명 또는 태그로 검색"
          maxLength={40}
          style={{
            backgroundColor: "#f5f5f5",
            padding: "8px 16px",
            borderRadius: "12px",
          }}
        />
      </div>

      {/* 코스 리스트 */}
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={22}>
          {/* 페이지네이션 된 코스 카드들을 화면에 표시 */}
          {paginatedCourses.map(
            (course: {
              id: React.Key | null | undefined;
              title: string;
              userName: string;
              tags: string[];
              imageUrl: string;
              time: number;
              comments: number;
              likes: number;
              meanrating: number;
              ratingCount: number;
            }) => (
              <CustomLink
                key={course.id}
                to={`/course/${course.id}`}
                icon={
                  <CourseCard
                    title={course.title}
                    userName={course.userName}
                    tags={course.tags}
                    imageUrl={course.imageUrl}
                    time={course.time}
                    comments={course.comments}
                    likes={course.likes}
                    meanrating={course.meanrating}
                    ratingCount={course.ratingCount}
                  />
                }
              />
            )
          )}
        </Col>
      </Row>

      {/* 페이지네이션 */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={courses.length}
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

// import React, { useState } from "react";
// import { Row, Col, Dropdown, Menu, FloatButton, Input } from "antd";
// import CourseCard from "../components/Course/Course";
// import * as I from "../assets/random";
// import { DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
// import CustomLink from "../components/Common/Link";
// import type { MenuProps } from "antd";

// // 코스를 최신순, 평점순, 가나다순으로 정렬하는 함수
// const sortCourses = (
//   courses: {
//     id: number;
//     title: string;
//     userName: string;
//     tags: string[];
//     imageUrl: string;
//     time: number;
//     comments: number;
//     likes: number;
//     meanrating: number;
//     ratingCount: number;
//   }[],
//   sortOrder: string
// ) => {
//   switch (sortOrder) {
//     case "latest":
//       return [...courses].sort((a, b) => b.time - a.time);
//     case "rating":
//       return [...courses].sort((a, b) => {
//         if (b.meanrating === a.meanrating) {
//           return a.title.localeCompare(b.title);
//         }
//         return b.meanrating - a.meanrating;
//       });
//     default:
//       return courses;
//   }
// };

// const CourseSelectPage = () => {
//   const [sortOrder, setSortOrder] = useState("latest"); // 기본 정렬을 최신순으로 설정
//   const [selectedLabel, setSelectedLabel] = useState("최신순"); // 선택된 필터의 라벨을 저장하는 상태
//   const courses = [
//     {
//       id: 1,
//       title: "코스 제목 1",
//       userName: "유저 닉네임 1",
//       tags: ["#맛집", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 4.0,
//       ratingCount: 10,
//     },
//     {
//       id: 2,
//       title: "코스 제목 2",
//       userName: "유저 닉네임 2",
//       tags: ["#카페", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.5,
//       ratingCount: 5,
//     },
//     {
//       id: 3,
//       title: "코스 제목 3",
//       userName: "유저 닉네임 3",
//       tags: ["#맛집", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 4.5,
//       ratingCount: 20,
//     },
//     {
//       id: 4,
//       title: "코스 제목 4",
//       userName: "유저 닉네임 4",
//       tags: ["#카페", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },
//     {
//       id: 5,
//       title: "코스 제목 5",
//       userName: "유저 닉네임 5",
//       tags: ["#카페", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },
//     {
//       id: 6,
//       title: "코스 제목 6",
//       userName: "유저 닉네임 6",
//       tags: ["#카페", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },
//     {
//       id: 7,
//       title: "코스 제목 7",
//       userName: "유저 닉네임 7",
//       tags: ["#카페", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },
//     {
//       id: 8,
//       title: "코스 제목 8",
//       userName: "유저 닉네임 8",
//       tags: ["#카페", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },
//     {
//       id: 9,
//       title: "코스 제목 9",
//       userName: "유저 닉네임 9",
//       tags: ["#카페", "#산책"],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },
//   ];

//   // 정렬된 코스 리스트
//   const sortedCourses = sortCourses(courses, sortOrder);

//   // 필터 메뉴 설정
//   const items: MenuProps["items"] = [
//     {
//       label: "최신순",
//       key: "latest",
//     },
//     {
//       label: "평점순",
//       key: "rating",
//     },
//   ];

//   const handleMenuClick: MenuProps["onClick"] = (e) => {
//     setSortOrder(e.key);
//     if (e.key === "latest") {
//       setSelectedLabel("최신순");
//     } else if (e.key === "rating") {
//       setSelectedLabel("평점순");
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "16px",
//           position: "relative",
//         }}
//       >
//         {/* 지역명을 가운데 정렬 */}
//         <div style={{ fontSize: "24px", fontWeight: "bold" }}>성수</div>
//         {/* 필터 버튼을 성수 글씨 밑에, 오른쪽에 정렬 */}
//         <div style={{ position: "absolute", right: 0, top: "40px" }}>
//           <Dropdown menu={{ items, onClick: handleMenuClick }}>
//             <a
//               onClick={(e) => e.preventDefault()}
//               style={{ marginTop: "8px", color: "black" }}
//             >
//               {selectedLabel} <DownOutlined />
//             </a>
//           </Dropdown>
//         </div>
//       </div>

//       {/* 검색 인풋 필드 */}
//       <div
//         style={{
//           display: "flex",
//           padding: "12px 16px",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           alignSelf: "stretch",
//         }}
//       >
//         <Input
//           prefix={<SearchOutlined />}
//           placeholder="코스명 또는 태그로 검색"
//           maxLength={40}
//           style={{
//             backgroundColor: "#f5f5f5",
//             padding: "8px 16px",
//             borderRadius: "12px",
//           }}
//         />
//       </div>

//       <Row justify="center" style={{ width: "100%" }}>
//         <Col xs={24} sm={22}>
//           {/* 정렬된 코스 카드들을 화면에 표시 */}
//           {sortedCourses.map((course) => (
//             <CustomLink
//               to={`/course/${course.id}`}
//               icon={
//                 <CourseCard
//                   title={course.title}
//                   userName={course.userName}
//                   tags={course.tags}
//                   imageUrl={course.imageUrl}
//                   time={course.time}
//                   comments={course.comments}
//                   likes={course.likes}
//                   meanrating={course.meanrating}
//                   ratingCount={course.ratingCount}
//                 />
//               }
//             />
//           ))}
//         </Col>
//       </Row>

//       {/* 코스 생성 페이지로 이동하는 플로팅 버튼 */}
//       <CustomLink
//         to="/course/create"
//         icon={
//           <FloatButton
//             icon={<PlusOutlined />}
//             type="primary"
//             tooltip="Add something"
//           />
//         }
//       />
//     </>
//   );
// };

// export default CourseSelectPage;
