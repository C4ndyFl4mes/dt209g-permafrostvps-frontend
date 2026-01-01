<script setup lang="ts">
    import type { TextContent } from '@/interfaces/TextContent';
    
    const { data } = defineProps<{
        data: Object | undefined;
    }>() as { data: TextContent | undefined };
</script>

<template>
    <article v-if="data" class="prose prose-lg mb-5 max-w-160" v-html="data.content"></article>
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