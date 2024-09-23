import { useState } from "react";
import axios from "axios";
import * as T from "../types";
import { encode2queryData } from "../services/encode"; // 인코딩 함수 불러오기

const useFetchModalData = () => {
  const [data, setData] = useState<T.DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const apiEndpoint =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

  const fetchData = async () => {
    setLoading(true);
    setError(false);

    // 쿼리 데이터 인코딩
    const encodedData = encode2queryData({
      page: currentPage,
      pageSize,
    });

    try {
      // 인코딩된 데이터 전송
      const response = await axios.get(`${apiEndpoint}/spot-api`, {
        params: { data: encodedData },
      });
      const { spots, total } = response.data;
      setData(
        spots.map((spot: T.SpotDetail) => ({
          id: spot.id,
          Spot_Name: spot.Spot_Name,
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

  return { data, loading, error, total, currentPage, setCurrentPage, fetchData };
};

export default useFetchModalData;
