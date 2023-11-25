import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../hooks/toast";
import { useLocalStorage } from "../hooks/useLocalstorage";
import { IUser } from "../interface/user";
import { IAPI_STATUS } from "../interface/api";

interface AuthContextType {
  user: IUser;
  token: string;
  login: any;
  logout: () => void;
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
  signupApiStatus: IAPI_STATUS;
  setSignupApiStatus: ((signupApiStatus: IAPI_STATUS) => void) | any;
  loginApiStatus: IAPI_STATUS;
  setLoginApiStatus: ((loginApiStatus: IAPI_STATUS) => void) | any;
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}:any) => {
  const { showToast } = CustomToast();
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [signupApiStatus, setSignupApiStatus] = useState<IAPI_STATUS>("");
  const [loginApiStatus, setLoginApiStatus] = useState<IAPI_STATUS>("");
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async ({
    user_data,
  }: {
    user_data: { access: string; user_data: IUser };
  }) => {
    setUser(user_data?.user_data);
    setToken(user_data?.access);
    showToast({
      message: `Logged in successfully`,
      status: "success",
    });
  };

  // call this function to sign out logged in user
  const logout = (): void => {
    navigate("/login");
    setUser(null);
    setToken(null);
    window.location.reload();
    showToast({
      message: `Logged out successfully`,
      status: "success",
    });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      setToken,
      setUser,
      signupApiStatus,
      setSignupApiStatus,
      loginApiStatus,
      setLoginApiStatus,
    }),
    [user, token, signupApiStatus, loginApiStatus, login, logout]
  );

  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
