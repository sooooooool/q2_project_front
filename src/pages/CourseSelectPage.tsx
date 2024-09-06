import React, { useState } from "react";
import { Row, Col, Dropdown, Menu, FloatButton, Input } from "antd";
import CourseCard from "../components/Course/Course";
import * as I from "../assets/random";
import { DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import CustomLink from "../components/Common/Link";
import type { MenuProps } from "antd";

// 코스를 최신순, 평점순, 가나다순으로 정렬하는 함수
const sortCourses = (
  courses: {
    id: number;
    title: string;
    userName: string;
    tags: string[];
    imageUrl: string;
    time: number;
    comments: number;
    likes: number;
    meanrating: number;
    ratingCount: number;
  }[],
  sortOrder: string
) => {
  switch (sortOrder) {
    case "latest":
      return [...courses].sort((a, b) => b.time - a.time);
    case "rating":
      return [...courses].sort((a, b) => {
        if (b.meanrating === a.meanrating) {
          return a.title.localeCompare(b.title);
        }
        return b.meanrating - a.meanrating;
      });
    default:
      return courses;
  }
};

const CourseSelectPage = () => {
  const [sortOrder, setSortOrder] = useState("latest"); // 기본 정렬을 최신순으로 설정
  const [selectedLabel, setSelectedLabel] = useState("최신순"); // 선택된 필터의 라벨을 저장하는 상태
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

  // 정렬된 코스 리스트
  const sortedCourses = sortCourses(courses, sortOrder);

  // 필터 메뉴 설정
  const items: MenuProps["items"] = [
    {
      label: "최신순",
      key: "latest",
    },
    {
      label: "평점순",
      key: "rating",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSortOrder(e.key);
    if (e.key === "latest") {
      setSelectedLabel("최신순");
    } else if (e.key === "rating") {
      setSelectedLabel("평점순");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          position: "relative",
        }}
      >
        {/* 지역명을 가운데 정렬 */}
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>성수</div>
        {/* 필터 버튼을 성수 글씨 밑에, 오른쪽에 정렬 */}
        <div style={{ position: "absolute", right: 0, top: "40px" }}>
          <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{ marginTop: "8px", color: "black" }}
            >
              {selectedLabel} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>

      {/* 검색 인풋 필드 */}
      <div
        style={{
          display: "flex",
          padding: "12px 16px",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
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

      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={22}>
          {/* 정렬된 코스 카드들을 화면에 표시 */}
          {sortedCourses.map((course) => (
            <CustomLink
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
          ))}
        </Col>
      </Row>

      {/* 코스 생성 페이지로 이동하는 플로팅 버튼 */}
      <CustomLink
        to="/course/create"
        icon={
          <FloatButton
            icon={<PlusOutlined />}
            type="primary"
            tooltip="Add something"
          />
        }
      />
    </>
  );
};

export default CourseSelectPage;

// import React, { useState } from 'react'
// import { Row, Col, Rate, Dropdown, Menu, FloatButton, Input } from 'antd'
// import CourseCard from '../components/Course/Course'

// import * as I from '../assets/random'
// import { DownOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
// import Title from 'antd/es/skeleton/Title';
// import CustomLink from '../components/Common/Link';

// const CourseSelectPage: React.FC = () => {
//   const courses = [
//     {
//       title: '코스 제목 1',
//       userName: '유저 닉네임 1',
//       tags: ['#맛집','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 4.0,
//       ratingCount: 10,
//     },
//     {
//       title: '코스 제목 2',
//       userName: '유저 닉네임 2',
//       tags: ['#카페','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.5,
//       ratingCount: 5,
//     },
//     {
//       title: '코스 제목 3',
//       userName: '유저 닉네임 3',
//       tags: ['#맛집','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 4.5,
//       ratingCount: 20,
//     },
//     {
//       title: '코스 제목 4',
//       userName: '유저 닉네임 4',
//       tags: ['#카페','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },{
//       title: '코스 제목 5',
//       userName: '유저 닉네임 5',
//       tags: ['#카페','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },{
//       title: '코스 제목 6',
//       userName: '유저 닉네임 6',
//       tags: ['#카페','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },{
//       title: '코스 제목 7',
//       userName: '유저 닉네임 7',
//       tags: ['#카페','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },{
//       title: '코스 제목 8',
//       userName: '유저 닉네임 8',
//       tags: ['#카페','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     },{
//       title: '코스 제목 9',
//       userName: '유저 닉네임 9',
//       tags: ['#카페','#산책'],
//       imageUrl: I.randomImage(800, 600),
//       time: 5,
//       comments: 20,
//       likes: 20,
//       meanrating: 3.0,
//       ratingCount: 2,
//     }
//   ]
//   return (
//     <>
//       <div style={{display: "flex", height: "32px", padding : "4px 0px", flexDirection: "column", gap: "10px" ,flexShrink: "0"}} >
//         {/* <Dropdown menu={} /> */}
//       </div>
//       <div style={{display : "flex", padding : "12px 16px", flexDirection : "column", alignItems : "flex-start", alignSelf : "stretch"}}>
//         <Input prefix={<SearchOutlined/>}
//           placeholder="코스명 또는 태그로 검색"
//           maxLength={40}
//           style={{backgroundColor : "#f5f5f5", display :"flex", padding : "8px 16px 8px 8px", alignItems : "center", flex : "1 0 0", alignSelf: "stretch", borderRadius : "12px" }} />
//       </div>
//       <Row justify="center" style={{ width: '100%' }}>
//         <Col xs={24} sm={22}>
//           {courses.map((card, index) => (
//             <CourseCard
//               key={index}
//               title={card.title}
//               userName={card.userName}
//               tags={card.tags}
//               imageUrl={card.imageUrl}
//               time={card.time}
//               comments={card.comments}
//               likes={card.likes}
//               meanrating={card.meanrating}
//               ratingCount={card.ratingCount}
//             />
//           ))}
//         </Col>
//       </Row>
//       <CustomLink to="/course/create" icon={<FloatButton icon={<PlusOutlined />} type="primary" tooltip="Add something" />} />
//     </>
//   )
// }

// export default CourseSelectPage;
