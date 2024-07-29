import axios from "axios";
import { DOMAIN, DOMAIN_COVID } from "@/lib/constant";

const axiosClient = axios.create({
  baseURL: DOMAIN,
  timeout: 10000,
  timeoutErrorMessage: "Request timed out",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // You can add logic here, like adding auth tokens
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // You can add logic here for successful responses
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);

      if (error.response.status === 401) {
        // Handle unauthorized access
        // For example, redirect to login page or refresh token
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }

    // You can add custom error messages based on status codes
    let errorMessage = "An error occurred. Please try again.";
    if (error.response && error.response.status === 404) {
      errorMessage = "Resource not found.";
    }

    return Promise.reject({ ...error, message: errorMessage });
  }
);

const axiosClientCovid = axios.create({
  baseURL: DOMAIN_COVID,
  timeout: 10000,
  timeoutErrorMessage: "Request timed out",
});

axiosClientCovid.interceptors.request.use(
  (config) => {
    // You can add logic here, like adding auth tokens
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClientCovid.interceptors.response.use(
  (response) => {
    // You can add logic here for successful responses
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);

      if (error.response.status === 401) {
        // Handle unauthorized access
        // For example, redirect to login page or refresh token
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }

    // You can add custom error messages based on status codes
    let errorMessage = "An error occurred. Please try again.";
    if (error.response && error.response.status === 404) {
      errorMessage = "Resource not found.";
    }

    return Promise.reject({ ...error, message: errorMessage });
  }
);

export { axiosClient, axiosClientCovid };
