import { useState } from "react";
import axios from "axios";
import * as T from "../types";
import { encode2queryData } from "../services/encode"; // 인코딩 함수 불러오기

const useFetchModalData = () => {
  const [data, setData] = useState<T.DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const apiEndpoint = process.env.REACT_APP_BACKEND_URL || "https://datepeek.link";

  const fetchData = async () => {
    setLoading(true);

    // 쿼리 데이터 인코딩
    const encodedData = encode2queryData({
      page: currentPage,
      pageSize,
    });

    try {
      // 인코딩된 데이터 전송
      const response = await axios.get(`${apiEndpoint}/spot-api`, {
        params: { data: encodedData }, // 쿼리 스트링으로 인코딩된 데이터 전달
      });

      setData(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, total, currentPage, setCurrentPage, fetchData };
};

export default useFetchModalData;
