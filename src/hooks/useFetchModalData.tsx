import { useState } from 'react';
import axios from 'axios';
import * as T from '../types';

const useFetchModalData = () => {
  const [data, setData] = useState<T.DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api-endpoint.com/spots', {
        params: {
          page,
          pageSize,
        },
      });
      setData(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, total, currentPage, setCurrentPage, fetchData };
};

export default useFetchModalData;