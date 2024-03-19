import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import LoaderView from '../components/LoaderView';
import {useAuthContext} from './AuthProvider';
import {axiosInstance} from '../libs/axiosInstance';

type IContext = {};

const AppContext = createContext<IContext>({} as IContext);

const AppProvider = ({children}: {children: ReactNode}) => {
  // const [isLoading, setIsLoading] = useState(true);

  // if (isLoading) {
  //   return <LoaderView />;
  // }

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
