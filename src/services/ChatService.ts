import type { Chat } from '../interfaces/Chat';
import type { Message } from '../interfaces/Message';
import axios, { type AxiosResponse, type AxiosRequestConfig, type RawAxiosRequestHeaders } from 'axios';

export class ChatService {
    // Axios klient för API-anrop
    private static client = axios.create({
        baseURL: 'http://localhost/project1/wordpress/wp-json/support/v1',
        withCredentials: true 
    });
    // Standardkonfiguration för API-anrop
    private static config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json'
        } as RawAxiosRequestHeaders
    };

    public static async getChats(): Promise<Chat[]> {
        const response: AxiosResponse<Chat[]> = await this.client.get('/chats', this.config);
        return response.data;
    }

    public static async getChat(user_id: number): Promise<Chat> {
        const response: AxiosResponse<Chat> = await this.client.get(`/chat?user_id=${user_id}`, this.config);
        return response.data;
    }

    public static async sendMessage(chat_id: number, message: string): Promise<Message> {
        const response: AxiosResponse<Message> = await this.client.post('/chat', {
            chat_id,
            message
        }, this.config);
        return response.data;
    }
}