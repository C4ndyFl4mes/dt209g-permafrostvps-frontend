<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import type { Chat } from '@/interfaces/Chat';
import type { User } from '@/interfaces/User';
import { ChatService } from '@/services/ChatService';

const props = defineProps<{ user_id: number | null }>();
const currentChat = ref<Chat | null>(null);
const newMessage = ref<string>('');

const loadChat = async (userId: number) => {
    const chat: Chat = await ChatService.getChat(userId);
    currentChat.value = chat;
    console.log('Chats for user', userId, chat);
};

const sendMessage = async () => {
    if (!newMessage.value.trim() || !currentChat.value) return;

    // TODO: Implement send message API call
    console.log('Sending message:', newMessage.value);

    // Clear the input
    newMessage.value = '';
};

watch(() => props.user_id, async (newUserId) => {
    if (newUserId !== null) {
        await loadChat(newUserId);
    } else {
        currentChat.value = null;
    }
});
onMounted(async () => {
    if (props.user_id !== null) {
        await loadChat(props.user_id);
    } else {
        currentChat.value = null;
    }
});
</script>

<template>
    <div class="bg-gray-50 w-full h-full flex flex-col">
        <!-- Chat header -->
        <div v-if="currentChat" class="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <h1 class="text-2xl font-bold text-gray-800">{{ currentChat.chatname }}'s Chat</h1>
        </div>

        <!-- Messages container -->
        <div v-if="currentChat && currentChat.messages" class="flex-1 overflow-y-auto p-4 space-y-3">
            <article v-for="message in currentChat.messages" :key="message.id"
                class="flex flex-col bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between mb-2">
                    <h2 class="font-semibold text-blue-600">{{ message.author }}</h2>
                    <time class="text-xs text-gray-500">{{ new Date(message.date).toLocaleString() }}</time>
                </div>
                <p class="text-gray-800 whitespace-pre-wrap">{{ message.content }}</p>
            </article>
        </div>

        <!-- Empty chat state -->
        <div v-else-if="currentChat" class="flex-1 flex items-center justify-center">
            <p class="text-gray-500 text-lg">No messages yet. Start the conversation!</p>
        </div>

        <!-- No chat selected state -->
        <div v-else class="flex-1 flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
            <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                    </path>
                </svg>
                <p class="text-gray-500 text-lg">Select a chat to start messaging</p>
            </div>
        </div>

        <!-- Message form -->
        <div v-if="currentChat" class="bg-white border-t border-gray-200 p-4">
            <form @submit.prevent="sendMessage" class="flex flex-col gap-2">
                <textarea v-model="newMessage" type="text" placeholder="Type your message..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                <button type="submit"
                    class="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    :disabled="!newMessage.trim()">Send
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped></style>