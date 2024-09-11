import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// 컨텍스트를 사용하는 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
