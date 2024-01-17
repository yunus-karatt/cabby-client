import axios from "axios";

const userBaseUrl=import.meta.env.VITE_ADMIN_BASE_URL

export const adminAxios=axios.create({
  
  baseURL:userBaseUrl,
  headers:{
    "Content-Type":"application/json"
  }
})