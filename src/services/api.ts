import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.clashroyale.com/v1",
});
