import axios from 'axios';

const API = axios.create({
    baseURL: 'https://kcmyvqc14f.execute-api.us-east-1.amazonaws.com/v0/'
});

export {API};