<script setup lang="ts">
import { useSiteConfigStore } from '@/stores/siteConfig';
import { computed } from 'vue';
const siteConfigStore = useSiteConfigStore();

const footerText = computed(() => siteConfigStore.config?.footer_settings.footer_text || 'Default footer text');
const contactInfo = computed(() => siteConfigStore.config?.footer_settings.contact || {
    email: '',
    phone: '',
    address: ''
});
</script>

<template>
    <footer class="p-4 text-center">
        <p>{{ footerText }}</p>
        <ul class="list-none flex flex-wrap justify-between p-2 gap-3">
            <li v-if="contactInfo.email">Email: {{ contactInfo.email }}</li>
            <li v-if="contactInfo.phone">Phone: {{ contactInfo.phone }}</li>
            <li v-if="contactInfo.address">Address: {{ contactInfo.address }}</li>
        </ul>
    </footer>
</template>

<style scoped></style>