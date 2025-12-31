import type { Message } from './Message';

// Gränssnitt för Chat-objekt
export interface Chat {
    chat_id: number;
    user_id: number;
    chatname: string;
    messages: Message[];
}