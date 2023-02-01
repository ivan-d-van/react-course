import axios from 'axios'
import { apiConfig } from '../config'
import { LoginResponse, RegisterResponse } from './interfaces';

export async function login(email: string, password: string): Promise<string> {
        const res = await axios.post<LoginResponse>(`${apiConfig.url}/sessions/create` , { email, password });
        return res.data.id_token;
  }
  
  export async function register(username: string, email: string, password: string): Promise<string> {
        const res = await axios.post<RegisterResponse>(`${apiConfig.url}/users`, { username, email, password });
        return res.data.id_token;
  }