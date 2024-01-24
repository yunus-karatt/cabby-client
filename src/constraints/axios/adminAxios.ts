import axios from "axios";

const userBaseUrl=import.meta.env.VITE_ADMIN_BASE_URL

export const adminAxios=axios.create({
  
  baseURL:userBaseUrl,
  headers:{
    "Content-Type":"application/json"
  },
}) 

adminAxios.interceptors.request.use((config)=>{
  const token=localStorage.getItem('adminToken')
  if(token){
    config.headers.Authorization=`${token}`
  }
  return config
})