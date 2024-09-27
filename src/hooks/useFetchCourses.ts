import { useState } from "react";
import axios from "axios";
import { CourseSummary } from "../types";
import { encode2queryData } from "../services/encode"; // 인코딩 함수 불러오기
import * as I from "../assets/random";

interface QueryData {
  location?: number;
  sortBy?: string;
  user?: number;
  page?: number;
  pageSize?: number;
  direction?: string;
}

const useFetchCourses = () => {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5; // 필요한 경우 페이지 크기를 조정하세요
  const apiEndpoint =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

  const fetchData = async (data: QueryData) => {
    setLoading(true);
    setError(false);

    // 쿼리 데이터 인코딩
    const encodedData = encode2queryData(data);

    try {
      // 인코딩된 데이터 전송
      const response = await axios.get(`${apiEndpoint}/course-api`, {
        params: { data: encodedData },
      });
      const { modifiedCourses, total } = response.data;
      setCourses(
        modifiedCourses.map((course: any) => ({
          id: course.id,
          title: course.title,
          userName: course.userName,
          tags: course.tags,
          imageUrl: course.imageUrl,
          meanrating: course.meanStarPoint,
        }))
      );
      setTotal(total);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    loading,
    error,
    total,
    currentPage,
    setCurrentPage,
    fetchData,
    pageSize,
  };
};

export default useFetchCourses;
