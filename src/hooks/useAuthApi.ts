import {useState} from 'react';

import {axiosInstance} from '../libs/axiosInstance';
import {useAppContext} from '../contexts/AppProvider';
import {showToast} from '../utils';

type AuthPath = 'signup' | 'login' | 'forgetpassword' | 'resetpassword';

const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {setAccessToken, login} = useAppContext();

  const authHandler = async (path: AuthPath, formData: any) => {
    setIsLoading(true);
    try {
      const {data} = await axiosInstance.post(path, formData);
      // Returns access token in data

      if (path === 'login') {
        setAccessToken(data.accessToken);
        showToast('Welcome');
        // Refreh token
        login(data.accessToken);
      } else if (path === 'signup') {
        setAccessToken(data.accessToken);
        showToast('Account created successfully');
      }
    } catch (ex: any) {
      const errorMsg =
        ex?.message === 'Network Error'
          ? ex?.message
          : ex?.response?.data?.message || 'Oops, something went wrong';
      showToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, authHandler};
};

export default useAuthApi;
