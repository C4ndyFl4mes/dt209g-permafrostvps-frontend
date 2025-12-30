<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { News } from '@/interfaces/News';

const { data } = defineProps<{
    data: Object | undefined;
}>() as { data: News | undefined };
</script>

<template>
    <h1 class="text-3xl font-bold mb-2">Latest News</h1>
    <div v-if="data" class="flex flex-col gap-6 mb-5">
        <article v-for="item in data?.news" :key="item.id" class="border-b pb-4 flex flex-col md:grid md:grid-cols-[auto_1fr]">
            <div class="w-fit rounded-2xl overflow-hidden mr-2 mb-2">
                <img :src="item.thumbnail" :alt="item.alt" class="w-32 h-auto object-cover" />
            </div>
            <div>
                <h2 class="text-2xl font-semibold mb-2">{{ item.title }}</h2>
                <p class="mb-2">{{ item.excerpt }}</p>
                <RouterLink :to="`/news/${item.slug}`" class="text-blue-500 hover:underline">Read more</RouterLink>
            </div>
            <small class="text-gray-600 mb-2">Published on: {{ new
                Date(item.date).toLocaleDateString()}}</small>
        </article>
    </div>
    <div v-else class="mb-5">
        <p>No news available.</p>
    </div>
</template>

<style scoped></style>