import { useEffect, useState } from "react";
import { API_URL } from "../utils/constant";
import useStore from "./useStore";
import { message } from "antd";
import { observer } from "mobx-react-lite";

/**
 * 
 * @param {string} endpoint 
 * @param {string} loadingMsg 
 * @param {string} successMsg 
 * @param {string} errorMsg 
 * @returns {[state:{isError:string|null,isSuccess:string|null,isLoading:boolean}, data:any, put:function]}
 */
const usePut = (endpoint, loadingMsg = "Loading", successMsg, errorMsg) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isError:null,
    isSuccess:null,
    isLoading:false
  })
  const store = useStore();
  /**
   * 
   * @param {object} body 
   */
  const put = async (body) => {
    setState({isError:null, isSuccess:null, isLoading:true})
    try {
      const res = await fetch(API_URL + endpoint, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (res.status == 401) {
        store.error = "Session Expired ! Please login again";
        store.isAuthenticated = false;
      } else if (res.status == 200) {
        if (Array.isArray(json.data)) setData((p) => [...json.data]);
        else setData((p) => ({ ...json.data }));
        setState(p=>({...p,isSuccess:json.msg}))
      } else {
        setState(p=>({...p,isError:json.msg}))
      }
    } catch (error) {
      setState(p=>({...p,isError:error.message}))
    } finally {
      setState(p=>({...p,isLoading:false}))
    }
  };
  return [state, data, put];
};

export default usePut;
