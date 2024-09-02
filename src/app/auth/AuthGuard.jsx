import { Navigate, useLocation } from "react-router-dom";
// HOOK
import useStore from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import AccessControl from "./RouteAccess";

function AuthGuard(props) {

  const { isAuthenticated,user } = useStore();
  const { pathname } = useLocation();
  const unProtectedRoute = ["/login", "/home", "/"];

  if (isAuthenticated || unProtectedRoute.includes(pathname)){
    return <AccessControl>{props.children}</AccessControl>;
  } 

  return <Navigate replace to="/login" state={{ from: pathname }} />;
}

export default observer(AuthGuard);
