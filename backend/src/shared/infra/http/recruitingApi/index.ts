import axios from 'axios';

export const recruitingApi = axios.create({
  baseURL: 'https://geekhunter-recruiting.s3.amazonaws.com',
});
