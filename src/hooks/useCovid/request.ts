import { axiosClientCovid } from "@/components/axiosClient";
import axios, { AxiosError } from "axios";
import toast from "react-toastify";
import { DataCovid } from "./type";

const fetchCovidList = async (page: number): Promise<DataCovid> => {
  try {
    const response = await axiosClientCovid.get("/regions", {
      params: {
        page,
        per_page: 10, // Adjust the number of items per page if necessary
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.code === "ECONNABORTED") {
        console.error("Permintaan timeout. Silakan coba lagi.");
      } else if (axiosError.response) {
        console.error("Response data:", axiosError.response.data);
        console.error("Response status:", axiosError.response.status);
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
      } else {
        console.error("Error:", axiosError.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export { fetchCovidList };
