import {useQuery as useReactQuery} from '@tanstack/react-query';
import {axiosInstance} from '../libs/axiosInstance';
import {useAuthContext} from '../contexts/AuthProvider';
import {showToast} from '../utils';

type QueryPath =
  | 'profile'
  | 'verification'
  | 'nigerian-banks'
  | 'recipients'
  | `recipients/${string}`
  | 'account-info';

const generateQueryKey = (path: QueryPath) => path.split('/');

export default function useQuery(path: QueryPath) {
  const queryKey = generateQueryKey(path);
  const {accessToken, logout} = useAuthContext();

  axiosInstance.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      if (error?.response?.status === 401 && !accessToken) {
        return logout();
      }

      // console.log('Error', error);
      return Promise.reject(error);
    },
  );

  const {data, ...rest} = useReactQuery({
    queryKey: queryKey,
    queryFn: () => axiosInstance(path),
    onError: (responseError: any) => {
      const errorMsg =
        responseError?.message === 'Network Error'
          ? responseError?.message
          : responseError?.response?.data?.message ||
            'Oops, something went wrong';

      showToast(errorMsg, 'error');
    },
  });
  return {data: data?.data, ...rest};
}
