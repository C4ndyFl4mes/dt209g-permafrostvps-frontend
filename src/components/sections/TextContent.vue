<script setup lang="ts">
    import type { TextContent } from '@/interfaces/TextContent';
    
    const { data } = defineProps<{
        data: Object | undefined;
    }>() as { data: TextContent | undefined };
</script>

<template>
    <div v-if="data" class="prose prose-lg mb-5" v-html="data.content"></div>
    <div v-else class="mb-5">
        <p>No text content available.</p>
    </div>
</template>

<style scoped></style>