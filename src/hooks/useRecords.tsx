import {useEffect, useState} from 'react';
import {useAppContext} from '../contexts/AppProvider';
import {axiosInstance} from '../libs/axiosInstance';
import {useAuthContext} from '../contexts/AuthProvider';
import {showToast} from '../utils';

const useRecords = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {records, setRecords} = useAppContext();
  const {user} = useAuthContext();

  async function getRecords() {
    try {
      const {data} = await axiosInstance.get(`/records?userId=${user?.id}`);
      setRecords(data.data);
    } catch (ex: any) {
      const errorMsg =
        ex?.message === 'Network Error'
          ? ex?.message
          : ex?.response?.data?.error || 'Oops, something went wrong';
      showToast(errorMsg, 'error');
      console.log(ex.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRecords();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return {isLoading, records, refetch: getRecords};
};

export default useRecords;
