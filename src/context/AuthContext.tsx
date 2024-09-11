import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import checkSessionAPI from "../utils/checkiSessionAPI";
import { Nullable } from "../@types/global";

interface User {
  email: string;
  nick: string;
}

interface AuthContextType {
  user: Nullable<User>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Nullable<User>>(null);

  const checkSession = async () => {
    const sessionUser = await checkSessionAPI(); // checkSessionAPI 는 사용자 정의 함수로 구현 필요
    console.log(sessionUser);
    if (sessionUser) {
      setUser(sessionUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkSession().then();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
