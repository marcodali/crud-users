import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const getAllUsers = async () => (await axios
  .get(`${baseUrl}/users`)).data;

export const deleteUser = async (user_id) => await axios
  .delete(`${baseUrl}/users/${user_id}`);

export const createUser = async (user) => await axios
  .post(`${baseUrl}/users`, user, { 'Content-Type': 'application/json' });

export const updateUser = async (user) => await axios
  .put(`${baseUrl}/users/${user.user_id}`, user, { 'Content-Type': 'application/json' });