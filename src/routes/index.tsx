import React from "react";
import { Routes, Route } from "react-router-dom";
import LocationSelectPage from "../pages/LocationSelectPage";
import CourseSelectPage from "../pages/CourseSelectPage";
import CourseCreatePage from "../pages/CourseCreatePage";
import CourseDetailPage from "../pages/CourseDetailPage"; // 코스 상세 페이지 임포트

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LocationSelectPage />} />
      <Route path="/course" element={<CourseSelectPage />} />
      <Route path="/course/create" element={<CourseCreatePage />} />
      <Route path="/course/:courseId" element={<CourseDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
