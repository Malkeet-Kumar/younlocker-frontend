import { useContext } from "react";
import AuthContext from "../contexts/JWTAuthContext";

const useStore = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error("hook must be used inside provider");
  }
  return store;
};
export default useStore;
