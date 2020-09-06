import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-9c28a.firebaseio.com/'
});

export default instance;