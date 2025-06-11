import axios from "axios";

const registerUser = (data) => {
  return axios.post(`/api/register`, data);
};

const loginUser = (data) => {
  return axios.post(`/api/login`, data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
