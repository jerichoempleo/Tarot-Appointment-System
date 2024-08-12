//This file is used to have a "base URL" para hindi mahirapan sa pag deploy

import axios from 'axios'; //Connecting to the API

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7160', // Change this when deploying
});

export default axiosInstance;