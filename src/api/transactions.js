import axios, { AxiosError } from 'axios';
import { apiConfig } from '../config';

export async function sendTransaction(name, amount, idToken) {
    try {
        const res = await axios.post(`${apiConfig.url}/api/protected/transactions`, { name, amount }, { headers: { Authorization: `Bearer ${idToken}` } });
        return res.data.trans_tokens;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw error
        } else {
            console.log(error)
        }
    }
  }
  
  export async function getTxHistory(idToken) {
    try {
        const res = await axios.get(`${apiConfig.url}/api/protected/transactions`, { headers: { Authorization: `Bearer ${idToken}` } });
        return res.data.trans_token;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw error
        } else {
            console.log(error)
        }
    }
  }