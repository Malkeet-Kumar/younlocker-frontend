import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useStore from "../hooks/useStore";

const hasAccess = (path, accessArray) => {
  const accessItem = accessArray.find((item) => item.path === path);
  return accessItem ? accessItem.access : false;
};

const AccessControl = ({ children: Component }) => {
  const location = useLocation();
  const { pageAccess } = useStore();
  const isAccessible = hasAccess(location.pathname, pageAccess);

  if (!isAccessible) {
    return <Navigate to="/404" />;
  }

  return <>{Component}</>;
};

export default AccessControl;
