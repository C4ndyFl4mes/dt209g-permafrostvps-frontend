import type { Login } from '@/interfaces/Login';
import type { WPError } from '@/interfaces/WPError';
import axios, { type AxiosResponse, type AxiosRequestConfig, type RawAxiosRequestHeaders } from 'axios';

export class AccountService {
    // Axios klient för API-anrop
    private static client = axios.create({
        baseURL: 'http://localhost/project1/wordpress/wp-json/auth/v1'
    });
    // Standardkonfiguration för API-anrop
    private static config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Credentials': 'include'
        } as RawAxiosRequestHeaders
    };

    public static async login(username: string, password: string): Promise<Login | WPError> {
        const response: AxiosResponse<Login> = await this.client.post('/login', {
            username,
            password
        }, this.config);
        return response.data;
    }

    public static async logout(): Promise<{ success: boolean, message: string }> {
        const response: AxiosResponse<{ success: boolean, message: string }> = await this.client.post('/logout', {}, this.config);
        return response.data;
    }

    public static async profile(): Promise<Login | WPError> {
        const response: AxiosResponse<Login> = await this.client.get('/profile', this.config);
        return response.data;
    }
}