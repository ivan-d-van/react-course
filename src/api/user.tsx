import axios, { AxiosError } from "axios";
import { apiConfig } from "../config";
import { UserData, UserList } from "./interfaces";

export async function getUserInfo(idToken: string | null): Promise<UserData> {
    try {
        const res = await axios.get<{ user_info_token: UserData }>(`${apiConfig.url}/api/protected/user-info`, { headers: { Authorization: `Bearer ${idToken}` } });
        const userInfo = res.data.user_info_token;
        return userInfo;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw error
        } else {
            throw error
        }
    }
  }
  
  export async function getUserList(filter: string, idToken: string | null): Promise<UserList[]> {
    try {
        const res = await axios.post<UserList[]>(apiConfig.url + "/api/protected/users/list", { filter }, { headers: { Authorization: `Bearer ${idToken}` } })
        return res.data;
    } catch (error) {
        // TODO: think about it
        if (error instanceof AxiosError && error.response?.status === 401) {
            throw error
        } else {
            throw error
        }
    }
  }