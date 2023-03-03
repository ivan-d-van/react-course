import * as authApi from '../api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface LoginAction {
    email: string
    password: string
}

export interface RegisterAction {
    username: string
    email: string
    password: string
}

export const login = createAsyncThunk<string | AxiosError, LoginAction>(
    'login',
    async ({ email, password }) => {
        try {
            const  idToken = await authApi.login(email, password);
            return idToken;
        } catch (error) {
            if ((error as any).response?.data) throw new Error((error as any).response.data)
            if ((error as any).message) throw new Error((error as any).message)
            throw error;
        }
    })

export const register = createAsyncThunk<string, RegisterAction>(
    'register',
    async ({ username, email, password }) => {
        try {
            const idToken = await authApi.register(username, email, password);
            return idToken;
        } catch (error) {
            if ((error as any).response?.data) throw new Error((error as any).response.data)
            if ((error as any).message) throw new Error((error as any).message)
            throw error;
        }
})