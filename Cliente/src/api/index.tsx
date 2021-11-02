import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const baseURL = "http://192.168.1.18:4000/api";
// const baseURL = "http://192.168.0.106:4000/api";
 const baseURL = "https://twist-wine.herokuapp.com/api";

const Api = axios.create({
  baseURL,
});

Api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers["x-token"] = token;
  }
  return config;
});

export default Api;
