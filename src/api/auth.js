import axios from 'axios'
import { apiConfig } from '../config'

export async function login(email, password) {
        const res = await axios.post(`${apiConfig.url}/sessions/create` , { email, password });
        return res.data.id_token;
  }
  
  export async function register(username, email, password) {
        const res = await axios.post(`${apiConfig.url}/users`, { username, email, password });
        return res.data.id_token;
  }