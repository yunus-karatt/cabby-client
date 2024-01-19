import axios from "axios";

const userBaseUrl=import.meta.env.VITE_DRIVER_BASE_URL

export const driverAxios=axios.create({
  
  baseURL:userBaseUrl,
  headers:{
    "Content-Type":"application/json"
  }
})