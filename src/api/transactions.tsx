import axios, { AxiosError } from 'axios';
import { apiConfig } from '../config';
import { TransactionData } from '../pages/cabinet/tx-history.form';

export async function sendTransaction(name: string, amount: number, idToken: string | null) {
    try {
        const res = await axios.post<{ trans_token: TransactionData }>(`${apiConfig.url}/api/protected/transactions`, { name, amount }, { headers: { Authorization: `Bearer ${idToken}` } });
        return res.data.trans_token;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw error
        } else {
            console.log(error)
        }
    }
  }
  
  export async function getTxHistory(idToken: string | null) {
    try {
        const res = await axios.get<{trans_token: TransactionData[]}>(`${apiConfig.url}/api/protected/transactions`, { headers: { Authorization: `Bearer ${idToken}` } });
        return res.data.trans_token;
    } catch (error) {
        // TODO: think about it
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw error
        } else {
            throw error
        }
    }
  }