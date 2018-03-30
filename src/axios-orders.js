import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-slv.firebaseio.com/'
})

export default instance;
