import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import checkSessionAPI from "../utils/checkiSessionAPI";
import { Nullable } from "../@types/global";

interface User {
  id: number;
  email: string;
  nick: string;
}

interface AuthContextType {
  user: Nullable<User>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  checkSession: () => Promise<void>;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider에서 사용할 타입을 정의합니다.
interface AuthProviderProps {
  children: ReactNode;
}

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

  // 로그인 함수
  const login = (userData: User) => {
    setUser(userData); // 로그인 시 사용자 정보를 설정
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null); // 로그아웃 시 사용자 정보를 초기화
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, checkSession, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth를 named export로 정의
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
