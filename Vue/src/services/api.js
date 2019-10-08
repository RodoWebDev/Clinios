import axios from "axios";
const dotenv = require('dotenv');

console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === undefined) {
  const result = dotenv.config();
  if (result.error) {
    console.log('dotenv.config error = ', result.error);
  } else {
    console.log('dotenv.config success = ', result.parsed);
  }
}

export default () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://clinios.com:8083' : 'http://localhost:8083'
  });
};
