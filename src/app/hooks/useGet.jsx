import { useEffect, useState } from "react";
import useStore from "./useStore";
import { API_URL } from "../utils/constant";
import { observer } from "mobx-react-lite";

/**
 * 
 * @param {string} endpoint 
 * @param {array} dependencies 
 * @returns {[state:{isError:string|null,isLoading:boolean},data:array|object,setData:function]}
 */
const useGet = (endpoint, dependencies = []) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isLoading:false,
    isError:null,
    isSuccess:null
  })
  const store = useStore();
  useEffect(() => {
    (async () => {
      setState({isError:null, isLoading:true})
      try {
        const res = await fetch(API_URL + endpoint, {
          credentials: "include"
        });
        const json = await res.json();
        if (res.status == 500) {
          setState(p=>({...p,isError:json.msg}))
        } else if (res.status == 401) {
          store.error = "Session Expired ! Please login again";
          store.isAuthenticated = false;
        } else {
          if (Array.isArray(json.data)) setData((p) => [...json.data]);
          else setData((p) => ({ ...json.data }));
          setState(p=>({...p, isSuccess:json.msg}))
        }
      } catch (error) {
        setState(p=>({...p,isError:error.message}))
      } finally {
        setState(p=>({...p,isLoading:false}))
      }
    })();
  }, [...dependencies]);

  return [state, data, setData];
};

export default useGet;
