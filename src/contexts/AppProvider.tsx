import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type User = {} | null;

type IContext = {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  logout: () => void;
  login: (token: string) => void;
};

const AppContext = createContext<IContext>({} as IContext);

const AppProvider = ({children}: {children: ReactNode}) => {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState<null | {}>({});

  const login = () => {};

  const logout = () => {
    setUser(null);
    setAccessToken('');
  };

  return (
    <AppContext.Provider
      value={{accessToken, setAccessToken, user, setUser, logout, login}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
