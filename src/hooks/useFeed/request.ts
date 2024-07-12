import { axiosClient } from "@/components/axiosClient";
import axios, { AxiosError } from "axios";
import { DataFeed } from ".";

const fetchFeed = async (): Promise<DataFeed[]> => {
  try {
    const response = await axiosClient.get<DataFeed[]>("/posts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.code === "ECONNABORTED") {
        //   toast.error("Permintaan timeout. Silakan coba lagi.");
      } else if (axiosError.response) {
        console.error("Response data:", axiosError.response.data);
        console.error("Response status:", axiosError.response.status);
        //   toast.error(
        //     `Error: ${axiosError.response.status} - ${axiosError.response.statusText}`
        //   );
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
        //   toast.error("Tidak ada respons dari server. Periksa koneksi Anda.");
        // toast.error(axiosError.request);
      } else {
        console.error("Error:", axiosError.message);
        //   toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    } else {
      console.error("Unexpected error:", error);
      // toast.error("Terjadi kesalahan yang tidak terduga. Silakan coba lagi.");
    }
    throw error;
  }
};

export { fetchFeed };
