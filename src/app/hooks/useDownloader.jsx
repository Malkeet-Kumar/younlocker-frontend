import { message } from "antd";
import { useEffect, useState } from "react";
import useStore from "./useStore";
import { API_URL } from "../utils/constant";

/**
 *
 * @param {string} endpoint
 * @param {string} onLoadingMsg
 * @param {string} onSuccessMsg
 * @param {string} onErrorMsg
 * @returns {[err:string,loading:boolean,download:function]}
 */
const useDownloader = (endpoint, onLoadingMsg = "", onSuccessMsg, onErrorMsg) => {
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const store = useStore();

  useEffect(() => {
    if (loading) {
      message.loading({
        content: onLoadingMsg,
        duration: 0,
        key: "loading"
      });
    } else {
      message.destroy("loading");
      if (err) {
        message.error({
          content: onErrorMsg ?? err,
          duration: 2,
          key: "error"
        });
      } else if (msg) {
        message.success({
          content: onSuccessMsg ?? msg,
          duration: 2,
          key: "result"
        });
      }
    }
    setErr(null);
    setMsg(null);
  }, [loading, err]);

  const download = async (queryParams = {}) => {
    setLoading(true);
    setErr(null);
    setMsg(null);
    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');
    try {
      const res = await fetch(API_URL + endpoint + "?" + queryString, {
        method: "GET",
        credentials: "include"
      });
      if (res.status === 401) {
        store.error = "Session Expired! Please login again";
        store.isAuthenticated = false;
      } else if (res.status === 200) {
        const blob = await res.blob();
        const contentDisposition = res.headers.get("Content-Disposition");
        let filename = "download"
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?(.+)"?/);
          if (match) {
            filename = match[1];
          }
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setMsg("File downloaded successfully");
      } else {
        const json = await res.json();
        setErr(json.msg);
      }
    } catch (error) {
      setErr(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return [err, loading, download];
};

export default useDownloader;
