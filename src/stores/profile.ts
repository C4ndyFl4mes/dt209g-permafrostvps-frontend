import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Login } from '@/interfaces/Login';
import type { WPError } from '@/interfaces/WPError';
import { AccountService } from '@/services/AccountService';

/**
 * Pinia store för hantering av användarprofilinformation.
 */
export const useProfileStore = defineStore('profile', () => {
    const user = ref<Login | WPError | null>(null);

    async function fetchUserProfile() {
        try {
            user.value = await AccountService.profile();
            if (!user.value) {
                user.value = {
                    code: 'no_user_data',
                    message: 'No user data returned from profile endpoint.',
                } as WPError;
            }
            if ('code' in user.value) {
                user.value = user.value as WPError;
            }

        } catch (error) {
            user.value = error as WPError;
        }
    }


    async function logout() {
        await AccountService.logout();
        user.value = null;
    }

    return { user, fetchUserProfile, logout };
});