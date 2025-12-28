<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { WPEditor } from '@/services/WPEditor';
import type { Section } from '@/interfaces/Section';
import { useRoute } from 'vue-router';

const route = useRoute();
const sections = ref<Section[]>([]);

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
    <div>
        <div v-for="section in sections" :key="section.id">
            <pre>{{ section }}</pre>
        </div>
    </div>
</template>

<style scoped></style>