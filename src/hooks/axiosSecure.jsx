import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const useAxiosSecure = () => {
  // --------- request ---------
  axiosSecure.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log("axios secure file", error.message);
      return Promise.reject(error);
    }
  );

  // ---------- response -----------
  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log("axios secure file", error.message);
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
