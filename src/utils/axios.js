import axios from 'axios';

const baseURL = 'https://storage.googleapis.com/urban-technical';

const instance = axios.create({
  baseURL,
});

instance.defaults.timeout = 2500;

export default instance;
