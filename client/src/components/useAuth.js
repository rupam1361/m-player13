import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://m-player13.herokuapp.com";
// const url = "http://localhost:5000";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  useEffect(() => {
    axios
      .post(`${url}/login`, {
        code,
      })
      .then((data) => {
        console.log(data.data);
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        setExpiresIn(data.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        // window.location = "/";
        console.log(err.message);
      });
  }, [code]);
  console.log(expiresIn);
  useEffect(() => {
    if (!accessToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${url}/refresh`, {
          refreshToken,
        })
        .then((data) => {
          setAccessToken(data.data.accessToken);
          setExpiresIn(data.data.expiresIn);
        })
        .catch((err) => {
          // window.location = "/";
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
