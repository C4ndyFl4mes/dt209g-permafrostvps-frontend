<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useSiteConfigStore } from '@/stores/siteConfig';

const siteConfigStore = useSiteConfigStore();


const logoURL = computed(() => siteConfigStore.config?.seo_settings.logotype?.url || '');
const logoALT = computed(() => siteConfigStore.config?.seo_settings.logotype?.alt || '');
const webSiteTitle = computed(() => siteConfigStore.config?.seo_settings.website_title || '');

</script>

<template>
    <header>
        <div class="p-2 flex flex-row flex-wrap items-center">
            <RouterLink to="/">
                <img :src="logoURL" :alt="logoALT" class="h-16 inline-block mr-4" />
                <span class="text-2xl font-semibold">{{ webSiteTitle }}</span>
            </RouterLink>
        </div>
    </header>
</template>

<style scoped></style>