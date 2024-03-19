import {useState} from 'react';

import {axiosInstance} from '../libs/axiosInstance';
import {showToast} from '../utils';
import {useNavigate} from './useNavigate';
import {ROUTES} from '../navs/routes';
import {useAuthContext} from '../contexts/AuthProvider';

type AuthPath = 'register' | 'login' | 'validate-security-question';

const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {navigate} = useNavigate();
  const {setUser} = useAuthContext();

  const authHandler = async (path: AuthPath, formData: any) => {
    setIsLoading(true);
    try {
      const {data} = await axiosInstance.post<{data: object; message: string}>(
        '/auth/' + path,
        formData,
      );
      // console.log('path', data);

      if (path === 'login') {
        showToast('Success');
        setUser(data.data);
        navigate(ROUTES.SECURITY_QUESTION, data.data);
      } else if (path === 'register') {
        setUser(data.data);
        showToast('Account created successfully');
      } else if (path === 'validate-security-question') {
        showToast('Correct');
        navigate(ROUTES.BIOMETRICS);
      }
    } catch (ex: any) {
      const errorMsg =
        ex?.message === 'Network Error'
          ? ex?.message
          : ex?.response?.data?.error || 'Oops, something went wrong';
      showToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, authHandler};
};

export default useAuthApi;
