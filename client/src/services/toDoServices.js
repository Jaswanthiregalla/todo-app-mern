import axios from "axios";
import { getUserDetails } from "../util/GetUser";

const authHeaders = () => {
  let userToken = getUserDetails()?.token;
  return { headers: { Authorization: userToken } };
};

const createToDo = (data) => {
  return axios.post(`/api/todo/create-to-do`, data, authHeaders());
};

const getToDo = (userId) => {
  return axios.get(`/api/todo/get-all-to-do/${userId}`, authHeaders());
};

const deleteToDo = (id) => {
  return axios.delete(`/api/todo/delete-to-do/${id}`, authHeaders());
};

const updateToDo = (id, data) => {
  return axios.patch(`/api/todo/update-to-do/${id}`, data, authHeaders());
};

const ToDoServices = {
  createToDo,
  getToDo,
  deleteToDo,
  updateToDo,
};

export default ToDoServices;
