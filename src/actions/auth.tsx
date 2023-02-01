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

export const login = createAsyncThunk<string, LoginAction>(
    'login',
    async ({ email, password }) => {
        try {
            const  idToken = await authApi.login(email, password);
            return idToken;
        } catch (error) {
            alert((error as any).response.data)
            throw error
        }
    })

export const register = createAsyncThunk<string, RegisterAction>(
    'register',
    async ({ username, email, password }) => {
        try {
            const idToken = await authApi.register(username, email, password);
            return idToken;
        } catch (error) {
            alert((error as any).response.data)
            throw error
    }
})