// Server config
import { useRecoilState } from "recoil";
import { forum_db } from "../firebase/forumConfig";
import * as serverConfig from "./server-config";

async function makeRequest(
  url = "",
  data = {},
  type = "",
  headers = { "Content-Type": "application/json" }
) {
  const response = await fetch(url, {
    method: type,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

async function getRequest(
  url = "",
  headers = { "Content-Type": "application/json" }
) {
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  return response.json();
}

export const checkToken = () => {
  const token = localStorage.getItem("token");
  return (
    !!token &&
    String(token) !== "null" &&
    String(token) !== "undefined" &&
    JSON.parse(token).expiry > new Date().getTime()
  );
};

async function createLocalstorageItem(key, value) {
  localStorage.setItem(key, value);
  return true;
}

export function fetchToken() {
  const token = localStorage.getItem("token");
  if (new Date().getTime() > token.expiry) {
    logout();
    throw new Error("Token expired.");
  }
  if (!token) {
    throw new Error("Token doesn't exist.");
  }
  return { token: JSON.parse(token).token };
}

export const login = async (credentials = {}) => {
  localStorage.removeItem("token");
  if (!credentials || !credentials.email || !credentials.password) {
    throw new Error("Some fields are missing.");
  }
  const data = await makeRequest(
    serverConfig.serverURL + serverConfig.routes.login,
    credentials,
    "POST"
  );

  console.log(data);

  if (!data.status) {
    console.log(data);
    return data;
  } else {
    console.log(data);
    createLocalstorageItem("email", data.message.email);
    createLocalstorageItem("nama", data.message.nama);
    createLocalstorageItem("username", data.message.username);
    createLocalstorageItem(
      "token",
      JSON.stringify({
        token: data.token,
        expiry: new Date().getTime() + 60 * 60 * 1000,
      })
    );
    return data;
  }
};

export const profile = async email => {
  const data = await getRequest(
    serverConfig.serverURL + serverConfig.routes.profile + "/" + email
  );

  return data;
};

export const register = async (credentials = {}) => {
  localStorage.removeItem("token");
  const data = await makeRequest(
    serverConfig.serverURL + serverConfig.routes.register,
    credentials,
    "POST"
  );

  console.log(data);

  if (!data.status) {
    return data;
  } else {
    forum_db.collection("users").doc(data.username).set({
      liked: 0,
    });
    createLocalstorageItem("username", data.username);
    createLocalstorageItem(
      "token",
      JSON.stringify({
        token: data.token,
        expiry: new Date().getTime() + 60 * 60 * 1000,
      })
    );
  }

  return data;
};

export const logout = async () => {
  localStorage.removeItem("token");

  return true;
};

export const getUsername = () => {
  return localStorage.getItem("username");
};
