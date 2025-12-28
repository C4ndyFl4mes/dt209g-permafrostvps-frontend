<script setup lang="ts">
    import { useSiteConfigStore } from '@/stores/siteConfig';
    const siteConfigStore = useSiteConfigStore();
    const logoURL = siteConfigStore.config?.seo_settings.logotype?.url || '';
    const logoALT = siteConfigStore.config?.seo_settings.logotype?.alt || '';
</script>

<template>
    <header>
        <div class="container p-1">
            <img :src="logoURL" :alt="logoALT" class="h-16 inline-block mr-4" />
        </div>
    </header>
</template>

<style scoped></style>