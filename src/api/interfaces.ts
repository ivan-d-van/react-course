export interface LoginResponse {
    id_token: string;
}

export interface RegisterResponse {
    id_token: string;
}

export interface UserData {
    id: number
    name: string
    email: string
    balance: number
}

export interface UserList {
    id: number
    name: string
}