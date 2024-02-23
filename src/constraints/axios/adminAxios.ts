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
  }else{
    console.log('no token',token)
  }
  return config
})
adminAxios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Response Error:", error.response.data);
    console.error("Status Code:", error.response.status);
    console.error("Headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request Error:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error:", error.message);
  }
  return Promise.reject(error);
});