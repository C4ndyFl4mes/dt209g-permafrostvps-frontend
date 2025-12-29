<script setup lang="ts">
    const { data } = defineProps<{
        data: Object | undefined;
    }>() as { data: { title: string } | undefined };
</script>

<template>
    <h1 v-if="data" class="text-3xl font-bold mb-10">{{ data?.title }}</h1>
    <h1 v-else class="text-3xl font-bold mb-10">No title available</h1>
</template>

<style scoped></style>