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
import {Record} from '../types';

type Context = {
  records: Record[] | null;
  setRecords: Dispatch<SetStateAction<Context['records']>>;
};

const AppContext = createContext({} as Context);

const AppProvider = ({children}: {children: ReactNode}) => {
  const [records, setRecords] = useState<Record[] | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  // if (isLoading) {
  //   return <LoaderView />;
  // }

  return (
    <AppContext.Provider value={{records, setRecords}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
