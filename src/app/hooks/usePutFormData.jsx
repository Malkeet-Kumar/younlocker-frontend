import { useState } from "react";
import { API_URL } from "../utils/constant";
import useStore from "./useStore";
import { observer } from "mobx-react-lite";

/**
 *
 * @param {string} endpoint
 * @returns {[state:{isError:null|string,isSuccess:null|string,isLoading:boolean}, data:any, post:function]}
 */
const usePutFormData = (endpoint) => {
  const store = useStore();
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isError: null,
    isSuccess: null,
    isLoading: false
  });
  /**
   *
   * @param {object} body
   */
  const put = async (body) => {
    const formData = new FormData();
    Object.entries(body).forEach(([k, v]) => formData.append(k, v));
    setState({
      isError: null,
      isSuccess: null,
      isLoading: false
    });
    try {
      const res = await fetch(API_URL + endpoint, {
        method: "PUT",
        credentials: "include",
        body: formData
      });
      const json = await res.json();
      if (res.status == 401) {
        store.error = "Session Expired ! Please login again";
        store.isAuthenticated = false;
      } else if (res.status == 201) {
        if (Array.isArray(json.data)) setData((p) => [...json.data]);
        else setData((p) => ({ ...json.data }));
        setState((p) => ({ ...p, isSuccess: json.msg }));
      } else {
        setState((p) => ({ ...p, isError: json.msg }));
      }
    } catch (error) {
      setState((p) => ({ ...p, isError: error.message }));
    } finally {
      setState((p) => ({ ...p, isLoading: false }));
    }
  };
  return [state, data, put];
};

export default usePutFormData;
