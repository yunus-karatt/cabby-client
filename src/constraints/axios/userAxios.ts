import axios from "axios";

const userBaseUrl=import.meta.env.VITE_USER_BASE_URL

export const userAxios=axios.create({
  
  baseURL:userBaseUrl,
  headers:{
    "Content-Type":"application/json"
  },
})

userAxios.interceptors.request.use(config=>{
  const token=localStorage.getItem("userToken")
  if(token){
    config.headers.Authorization=token
  }
  return config
})