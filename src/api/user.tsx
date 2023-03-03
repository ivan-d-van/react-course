import axios from "axios";
import { apiConfig } from "../config";
import { UserData, UserList } from "./interfaces";

export async function getUserInfo(idToken: string | null): Promise<UserData> {
    const res = await axios.get<{ user_info_token: UserData }>(`${apiConfig.url}/api/protected/user-info`, { headers: { Authorization: `Bearer ${idToken}` } });
    const userInfo = res.data.user_info_token;
    return userInfo;
  }
  
  export async function getUserList(filter: string, idToken: string | null): Promise<UserList[]> {
    const res = await axios.post<UserList[]>(apiConfig.url + "/api/protected/users/list", { filter }, { headers: { Authorization: `Bearer ${idToken}` } })
    return res.data;
  }