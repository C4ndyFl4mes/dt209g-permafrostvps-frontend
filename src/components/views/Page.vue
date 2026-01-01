<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, type Component } from 'vue';
import { useSiteConfigStore } from '@/stores/siteConfig';
import { WPEditor } from '@/services/WPEditor';
import type { Section } from '@/interfaces/Section';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Banner from '@/components/sections/Banner.vue';
import PageTitle from '@/components/sections/PageTitle.vue';
import TierCards from '@/components/sections/TierCards.vue';
import TextContent from '@/components/sections/TextContent.vue';
import SupportCards from '@/components/sections/SupportCards.vue';
import News from '@/components/sections/News.vue';

const route = useRoute();
const sections = ref<Section[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const siteConfigStore = useSiteConfigStore();

// Mappa sektionstyper till komponenter
const componentMap: Record<string, Component> = {
    'banner': Banner,
    'header': PageTitle,
    'tiercards': TierCards,
    'text': TextContent,
    'support': SupportCards,
    'news': News
};

// Hämta sektioner för en given sid-slug
async function fetchSections(slug: string) {
    isLoading.value = true;
    error.value = null;
    try {
        const result = await WPEditor.getSections(slug);
        if (Array.isArray(result)) {
            sections.value = result;
        } else {
            error.value = 'Invalid response from server';
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 404) {
                error.value = 'Page not found';
            } else {
                error.value = err.response?.data?.message || 'An error occurred while loading the page';
            }
        } else {
            error.value = 'An unexpected error occurred';
        }
    } finally {
        isLoading.value = false;
    }
}

// Hämta sektioner när komponenten monteras
onMounted(async () => {
    const slug = route.params.slug as string;
    await fetchSections(slug);
});

// Övervakar ändringar i sid-slug och uppdaterar sektionerna.
watch(() => route.params.slug, async (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
        await fetchSections(newSlug as string);
    }
});

// Uppdatera dokumentets titel baserat på sidans innehåll och webbplatsens titel
watchEffect(() => {
    const siteName = siteConfigStore.config?.seo_settings.website_title || '';
    if (sections.value.length > 0) {
        const headerSection = sections.value.find(section => section.type === 'header');
        const pageTitle = headerSection?.data?.title || route.params.slug || '';
        document.title = pageTitle ? `${pageTitle} | ${siteName}` : siteName;
    } else {
        document.title = siteName;
    }
});
</script>

<template>
    <div class="mx-auto p-2 container max-w-300 flex flex-col gap-4">
        <div v-if="isLoading" class="text-center py-8">Loading page...</div>
        <div v-else-if="error" class="text-center py-8">
            <p class="text-red-600">{{ error }}</p>
        </div>
        <div v-else-if="sections.length === 0" class="text-center py-8">
            <p class="text-gray-600">No content available for this page.</p>
        </div>
        <div v-else v-for="section in sections" :key="section.id">
            <component :is="componentMap[section.type]" :data="section.data" />
        </div>
    </div>
</template>

<style scoped></style>