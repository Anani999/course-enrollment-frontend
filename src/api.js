import axios from 'axios';

const token = localStorage.getItem('token');
const api = axios.create({
    baseURL:'http://localhost:5000/api',
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;