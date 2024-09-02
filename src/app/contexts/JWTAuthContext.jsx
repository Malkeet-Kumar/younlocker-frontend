import { createContext, useEffect } from "react";
import AuthStore from "../stores/authStore";
import { SdlLoading } from "../components";
import { observer } from "mobx-react-lite";
import { styled } from "@mui/material";
import { useLocation } from "react-router-dom";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

const contextState = {
  ...initialState,
  login: () => {},
  logout: () => {},
  register: () => {}
};
const AuthContext = createContext();

const Center = styled("div")(({ theme }) => ({
  height: "96vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

const authStore = new AuthStore();
export const AuthProvider = observer(({ children }) => {
  const {pathname} = useLocation()
  const unProtectedRoute = [
    '/home',
    '/login',
    '/register',
    '/'
  ]
  useEffect(() => {
    (async()=>{
      await authStore.initialize();
      if(unProtectedRoute.includes(pathname)) authStore.error=null
    })()
  }, [authStore]);

  if (!authStore.isInitialized) {
    return (
      <Center>
        <SdlLoading />
      </Center>
    );
  }

  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
});

export default AuthContext;
