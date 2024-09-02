import { useEffect, useState } from "react";
import { API_URL } from "../utils/constant";
import useStore from "./useStore";
import { message } from "antd";

/**
 *
 * @param {string} endpoint
 * @returns {[state:{isSuccess:null|string,isError:null|string,isLoading:boolean},deletedId:string,makeDeleteRequest:function]}
 */
const useDelete = (endpoint) => {
  const [deletedId, setData] = useState([]);
  const [state, setState] = useState({
    isError: null,
    isSuccess: null,
    isLoading: false
  });
  const store = useStore();

  const makeDeleteRequest = async (body,queryParams = {}) => {
    setState({
      isSuccess: null,
      isError: null,
      isLoading: true
    });
    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join("&");
    try {
      const res = await fetch(API_URL + endpoint + "?" + queryString, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body:JSON.stringify(body)
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
  return [state, deletedId, makeDeleteRequest];
};

export default useDelete;
