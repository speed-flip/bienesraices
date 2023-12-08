import axios from 'axios';

const AdminClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export default AdminClient;
