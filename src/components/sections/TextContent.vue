<script setup lang="ts">
import { computed } from 'vue';
import type { TextContent } from '@/interfaces/TextContent';

const { data } = defineProps<{
    data: Object | undefined;
}>() as { data: TextContent | undefined };

const hasH2 = computed(() => /<h2\b[^>]*>/i.test(data?.content ?? ''));
</script>

<template>
    <article v-if="data && hasH2" class="prose prose-lg mb-5 max-w-160" v-html="data.content"></article>
    <div v-else-if="data" class="prose prose-lg mb-5 max-w-160" v-html="data.content"></div>
    <div v-else class="mb-5">
        <p>No text content available.</p>
    </div>
</template>

<style scoped>
:deep(p) {
    margin-bottom: 1rem;
}

:deep(p:last-child) {
    margin-bottom: 0;
}

:deep(h2) {
    font-size: 1.5rem;
}
</style>