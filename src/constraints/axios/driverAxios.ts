import axios from "axios";

const userBaseUrl=import.meta.env.VITE_DRIVER_BASE_URL

export const driverAxios=axios.create({
  
  baseURL:userBaseUrl,
  headers:{
    "Content-Type":"application/json"
  },
})
driverAxios.interceptors.request.use(config=>{
  const token=localStorage.getItem("driverToken")
  if(token){
    config.headers.Authorization=token
  }
  return config
})