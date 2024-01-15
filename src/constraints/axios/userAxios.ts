import axios from "axios";

const userBaseUrl=import.meta.env.VITE_USER_BASE_URL

export const userAxios=axios.create({
  
  baseURL:userBaseUrl,
  headers:{
    "Content-Type":"application/json"
  }
})