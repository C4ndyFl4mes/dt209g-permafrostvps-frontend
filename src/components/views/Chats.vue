<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { User } from '@/interfaces/User';
import type { WPError } from '@/interfaces/WPError';
import { useProfileStore } from '@/stores/profile';
import { ChatService } from '@/services/ChatService';
import type { Chat } from '@/interfaces/Chat';
import ChatComponent from '@/components/layout/Chat.vue';


const profileStore = useProfileStore();
const authenticating = ref<boolean>(false);
const user = ref<User | WPError | null>(null);
const chats = ref<Chat[]>([]);
const currentUserID = ref<number | null>(null);
const showChatList = ref<boolean>(true);

function openChat(userId: number | string) {
    currentUserID.value = typeof userId === 'string' ? parseInt(userId, 10) : userId;
    console.log('Open chat with ID:', currentUserID.value);

    // Hide chat list on mobile when a chat is selected
    if (window.innerWidth < 768) {
        showChatList.value = false;
    }
}

function toggleChatList() {
    showChatList.value = !showChatList.value;
}

function handleResize() {
    // Always show chat list on desktop
    if (window.innerWidth >= 768) {
        showChatList.value = true;
    }
}

onMounted(async () => {
    authenticating.value = true;
    await profileStore.fetchUserProfile();
    const response = profileStore.user;
    user.value = response && 'user' in response ? response.user : response;
    authenticating.value = false;

    if (user.value && 'id' in user.value) {
        chats.value = await ChatService.getChats();
        
        // If user has no chats (non-supporter), automatically load their own chat
        if (chats.value.length === 0) {
            currentUserID.value = user.value.id;
            // Hide chat list on mobile for non-supporters since they don't need it
            if (window.innerWidth < 768) {
                showChatList.value = false;
            }
        }
        // If user has exactly one chat, auto-select it
        else if (chats.value.length === 1) {
            openChat(chats.value[0]!.user_id);
        }
    }

    // Visa chatlist på mobila enheter som standard
    if (window.innerWidth < 768) {
        showChatList.value = true;
    }

    // Lägg till resize-lyssnare för att hantera visning av chatlist
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    // Ta bort resize-lyssnare vid avmontering
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div class="p-2 flex-1 flex flex-col h-full">
        <div v-if="authenticating" class="loading">
            Loading profile...
        </div>
        <div v-else class="flex flex-col flex-1 h-full">
            <button v-if="user && 'id' in user" @click="toggleChatList"
                class="md:hidden mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {{ showChatList ? 'Hide Chats' : 'Show Chats' }}
            </button>
            <div class="flex flex-1 h-full">
                <div v-if="user && 'id' in user" :class="[
                    'flex flex-col gap-y-2 overflow-x-hidden overflow-y-auto h-full bg-slate-100 transition-all duration-300',
                    showChatList ? 'w-64 md:w-56 p-2' : 'w-0 p-0'
                ]">
                    <button v-for="chat in chats" :key="chat.chat_id" @click="openChat(chat.user_id)" :class="[
                        'w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer',
                        currentUserID === (typeof chat.user_id === 'string' ? parseInt(chat.user_id, 10) : chat.user_id)
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:shadow-sm hover:scale-[1.02]'
                    ]">
                        <span class="truncate">{{ chat.chatname }}</span>
                    </button>
                </div>
                <div v-else-if="!user || !('id' in user)">
                    <h2>Please log in to access your chats.</h2>
                </div>
                <div class="flex-1 min-w-0">
                    <ChatComponent v-if="user && 'id' in user" :user_id="currentUserID" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>