import axios from 'axios';

const Api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 60000
})

export { Api };