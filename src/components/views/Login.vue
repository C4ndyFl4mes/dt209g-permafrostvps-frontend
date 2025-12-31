<script setup lang="ts">
import { ref } from 'vue';
import type { Login } from '@/interfaces/Login';
import type { WPError } from '@/interfaces/WPError';
import { AccountService } from '@/services/AccountService';
import { useProfileStore } from '@/stores/profile';

const server_error = ref<WPError | any | null>(null);
const user_error = ref<string | null>(null);
const login_success = ref<{ success: boolean, message: string } | null>(null);
const formData = ref({
    username: '',
    password: ''
});
const loggingIn = ref<boolean>(false);

async function handleLogin() {
    loggingIn.value = true;
    if (!formData.value.username || !formData.value.password) {
        user_error.value = 'Username and password are required.';
        login_success.value = null;
        loggingIn.value = false;

        return;
    } else {
        user_error.value = null;
    }
    try {
        const loginData: Login | WPError = await AccountService.login(formData.value.username, formData.value.password);
        if ('success' in loginData && loginData.success) {
             // Hantera framgångsrik inloggning
            server_error.value = null;
            user_error.value = null;
            formData.value.username = '';
            formData.value.password = '';

            
            const profileStore = useProfileStore();
            await profileStore.fetchUserProfile();
            loggingIn.value = false;

            login_success.value = {
                success: true,
                message: `Login Successful! Welcome, ${loginData.user.username}!`
            };
        }
    } catch (error: WPError | any) {
        if (error.response && error.response.data && error.response.data.message) {
            server_error.value = error.response.data;
            login_success.value = null;
            loggingIn.value = false;
        } else {
            server_error.value = {
                message: 'An unexpected error occurred during login.'
            };
            login_success.value = null;
            loggingIn.value = false;

        }
    }
}

</script>

<template>
    <div class="mx-auto p-2 container max-w-300 flex flex-col gap-4 overflow-x-hidden">
        <h1 class="text-3xl font-bold mb-4 mx-auto">Login</h1>
        <form @submit.prevent="handleLogin" class="mx-auto flex flex-col self-center gap-4 w-full max-w-150">
            <label class="block mb-1">
                <span>Username:</span>
                <input type="text" id="username" name="username" autocomplete="username" v-model="formData.username"
                    class="w-full p-2 border border-gray-300 rounded" placeholder="Enter username..." />
            </label>
            <label class="block mb-1">
                <span>Password:</span>
                <input type="password" id="password" name="password" autocomplete="current-password" v-model="formData.password"
                    class="w-full p-2 border border-gray-300 rounded" placeholder="Enter password..." />
            </label>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
            <div v-if="loggingIn" class="text-center text-gray-600">
                <p>Logging in...</p>
            </div>
            <div v-if="server_error" class="text-white mt-2 text-center bg-red-500 p-2 rounded w-fit mx-auto">
                <p>Error: {{ server_error.message }}</p> 
            </div>
            <div v-if="user_error" class="text-white mt-2 text-center bg-red-500 p-2 rounded w-fit mx-auto">
                <p>Error: {{ user_error }}</p>
            </div>
            <div v-if="login_success" class="text-white mt-2 text-center bg-green-500 p-2 rounded w-fit mx-auto">
                <p>{{ login_success.message }}</p>
            </div> 
        </form>
    </div>
</template>

<style scoped></style>