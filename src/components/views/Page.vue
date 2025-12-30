<script setup lang="ts">
import { onMounted, ref, watch, type Component } from 'vue';
import { WPEditor } from '@/services/WPEditor';
import type { Section } from '@/interfaces/Section';
import { useRoute } from 'vue-router';
import Banner from '@/components/sections/Banner.vue';
import PageTitle from '@/components/sections/PageTitle.vue';
import TierCards from '@/components/sections/TierCards.vue';
import TextContent from '@/components/sections/TextContent.vue';
import SupportCards from '@/components/sections/SupportCards.vue';
import News from '@/components/sections/News.vue';

const route = useRoute();
const sections = ref<Section[]>([]);

// Mappa sektionstyper till komponenter
const componentMap: Record<string, Component> = {
    'banner': Banner,
    'header': PageTitle,
    'tiercards': TierCards,
    'text': TextContent,
    'support': SupportCards,
    'news': News
};


// Hämta sektioner när komponenten monteras
onMounted(async () => {
    sections.value = await WPEditor.getSections(route.params.slug as string);
});

/**
 * Övervakar ändringar i sid-slug och uppdaterar sektionerna.
 */
watch(() => route.params.slug, async (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
        sections.value = await WPEditor.getSections(newSlug as string);
    }
});
</script>

<template>
    <div class="mx-auto p-2 container max-w-300 flex flex-col gap-4">
        <div v-for="section in sections" :key="section.id">
            <component :is="componentMap[section.type]" :data="section.data" />
        </div>
    </div>
</template>

<style scoped></style>