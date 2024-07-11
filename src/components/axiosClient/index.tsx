import { baseUrl } from "@/lib/constant";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${baseUrl}`,
  timeoutErrorMessage: "Timeout",
  timeout: 10000,
});
