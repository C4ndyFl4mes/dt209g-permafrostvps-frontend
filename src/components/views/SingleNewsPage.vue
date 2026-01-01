<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useSiteConfigStore } from '@/stores/siteConfig';
import type { NewsItem } from '@/interfaces/NewsItem';
import { WPEditor } from '@/services/WPEditor';

const route = useRoute();
let newsItem = ref<NewsItem | null>(null);
const siteConfigStore = useSiteConfigStore();

// Hämta nyhetsartikel baserat på newslug
watch(() => route.params.newsslug, async (newSlug) => {
    if (newSlug) {
        newsItem.value = await WPEditor.getSingleNews(newSlug as string);
    }
}, { immediate: true });

// Uppdatera dokumentets titel baserat på nyhetsartikelns titel och webbplatsens titel
watchEffect(() => {
    const siteName = siteConfigStore.config?.seo_settings.website_title || '';
    document.title = newsItem.value?.title ? `${newsItem.value.title} | ${siteName}` : siteName;
});
</script>

<template>
    <article v-if="newsItem" class="mx-auto p-2 container max-w-300 flex flex-col gap-4">
        <div class="w-fit rounded-2xl overflow-hidden mx-auto mb-4">
            <img :src="newsItem.thumbnail" :alt="newsItem.alt" class="w-100 h-auto" />
        </div>
        <h1 class="text-3xl font-bold mb-2 mx-auto">{{ newsItem.title }}</h1>
        <div class="news-columns" v-html="newsItem.content"></div>
        <small class="text-gray-600 mt-5 mb-2 ms-auto">Published by {{ newsItem.author }} on {{ new
            Date(newsItem.date).toLocaleDateString()}}</small>
    </article>
    <div v-else class="mx-auto p-2 container max-w-300 flex flex-col gap-4">
        <p>Loading news item...</p>
    </div>
</template>

<style scoped>
.news-columns {
    column-count: 2;
    column-gap: 2rem;
    
    hyphens: auto;

}

:deep(.news-columns p) {
    margin-bottom: 1rem;
    text-align: justify;
}

@media (max-width: 768px) {
    .news-columns {
        column-count: 1;
    }
}

</style>