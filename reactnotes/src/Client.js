var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/',
});

module.exports = axiosInstance;