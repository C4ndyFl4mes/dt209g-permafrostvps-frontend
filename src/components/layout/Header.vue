<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useSiteConfigStore } from '@/stores/siteConfig';
// import { useProfileStore } from '@/stores/profile';
// import type { WPError } from '@/interfaces/WPError';
// import type { User } from '@/interfaces/User';

const siteConfigStore = useSiteConfigStore();
// const profileStore = useProfileStore();

const logoURL = computed(() => siteConfigStore.config?.seo_settings.logotype?.url || '');
const logoALT = computed(() => siteConfigStore.config?.seo_settings.logotype?.alt || '');

// let user = ref<User | WPError | null>(null);
// let loggingOut = ref<boolean>(false);

// Hämta användarprofil om inloggad
// watch(() => profileStore.user, (newUser) => {
//     if (newUser) {
//         if ('success' in newUser) {
//             user.value = newUser.user;
//         } else if ('code' in newUser) {
//             user.value = null;
//         }
//     } else {
//         user.value = null;
//     }
// }, { immediate: true });

// async function logout() {
//     loggingOut.value = true;
//     await profileStore.logout();
//     loggingOut.value = false;
// }
</script>

<template>
    <header class="flex flex-row flex-wrap justify-between">
        <div class="p-2">
            <img :src="logoURL" :alt="logoALT" class="h-16 inline-block mr-4" />
        </div>
        <!-- <div class="my-auto p-2">
            <div v-if="!loggingOut">
            <div v-if="user && 'id' in user" class="flex items-center gap-x-2">
                <p class="mr-4" v-if="user.username">{{ user.username }}</p>
                <p class="mr-4" v-else>Massive ERROR</p>
                <div class="w-fit rounded-full overflow-hidden" v-if="user.profile_image">
                    <img :src="user.profile_image" alt="User Avatar" class="h-auto w-12" />
                </div>
                <div v-else class="flex items-center justify-center">
                    <span class="text-gray-600">N/A</span>
                </div>
                <div>
                    <button @click="logout" class="bg-sky-800 py-2 px-4 rounded hover:brightness-95 active:brightness-90 cursor-pointer">Logout</button>
                </div>
            </div>
            <div v-else>
                <p>Not logged in</p>
            </div>
            </div>
            <div v-else class="flex items-center justify-center">
                <span class="text-gray-600">Logging out...</span>
            </div>
        </div> -->
    </header>
</template>

<style scoped></style>