import { message } from "antd";
import { useEffect, useState } from "react";
import useStore from "./useStore";
import { API_URL } from "../utils/constant";
import { observer } from "mobx-react-lite";

/**
 *
 * @param {string} endpoint
 * @returns {[state:{isError:string, isSuccess:string, isLoading:boolean},data:array|object,fetchData:function]}
 */
const useGetDelayed = (endpoint) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({ isError: null, isSuccess: null, isLoading: false });
  const store = useStore();

  const fetchData = async (queryParams = {}) => {
    setState({ isError: null, isLoading: true });
    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join("&");
    try {
      const res = await fetch(API_URL + endpoint + "?" + queryString, {
        method: "GET",
        credentials: "include"
      });
      const json = await res.json();
      if (res.status == 401) {
        store.error = "Session Expired ! Please login again";
        store.isAuthenticated = false;
      } else if (res.status == 200) {
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

  return [state, data, fetchData];
};

export default useGetDelayed;
