import axios,{AxiosInstance, InternalAxiosRequestConfig} from "axios"


const axiosInstance: AxiosInstance= axios.create({
    baseURL: "http://localhost:8000/api", 
    headers:{
    "Content-Type":"application/json"
    },  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
  );


  //Response interceptor
  axiosInstance.interceptors.response.use(
    (response)=>response,
   (error)=>{
    if(error.response?.status===401){
        console.error("Unauthorized! Redirect to login...");
    }
    return Promise.reject(error);
   }
  );

  export default axiosInstance;