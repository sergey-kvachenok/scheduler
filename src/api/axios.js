import axios from 'axios'

const instance = axios.create({
  baseURL: ' https://storage.googleapis.com/urban-technical'
});

// const instance = axios.create();
instance.defaults.timeout = 2500;

export default instance;