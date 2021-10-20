import axios from 'axios';

export const http = axios.create({
    // baseURL: 'https://api-adas.herokuapp.com/api/v1.0',
    //baseURL: 'http://192.168.0.3:3000/api/v1.0',
    baseURL: 'http://localhost:3000/api/v1.0',
    headers: { 'x-access-token': localStorage.token }
})
