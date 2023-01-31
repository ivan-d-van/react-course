import axios, { AxiosError } from "axios";
import { apiConfig } from "../config";

export async function getUserInfo(idToken) {
    try {
        const res = await axios.get(`${apiConfig.url}/api/protected/user-info`, { headers: { Authorization: `Bearer ${idToken}` } });
        const userInfo = res.data.user_info_token;
        return userInfo;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw error
        } else {
            console.log(error)
        }
    }
  }
  
  export async function getUserList(filter, idToken) {
    try {
        const res = await axios.post(apiConfig.url + "/api/protected/users/list", { filter }, { headers: { Authorization: `Bearer ${idToken}` } })

        return res.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw error
        } else {
            console.log(error)
        }
    }
  }