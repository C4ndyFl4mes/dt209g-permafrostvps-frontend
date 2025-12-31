<script setup lang="ts">
import { computed } from 'vue';
import { useSiteConfigStore } from '@/stores/siteConfig';

const siteConfigStore = useSiteConfigStore();


const logoURL = computed(() => siteConfigStore.config?.seo_settings.logotype?.url || '');
const logoALT = computed(() => siteConfigStore.config?.seo_settings.logotype?.alt || '');

</script>

<template>
    <header class="flex flex-row flex-wrap justify-between">
        <div class="p-2">
            <img :src="logoURL" :alt="logoALT" class="h-16 inline-block mr-4" />
        </div>
    </header>
</template>

<style scoped></style>