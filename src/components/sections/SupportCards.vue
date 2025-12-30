<script setup lang="ts">
    import type { SupportItem } from '@/interfaces/SupportItem';
import type { SupportList } from '@/interfaces/SupportList';
   
    const { data } = defineProps<{
        data: Object | undefined;
    }>() as { data: SupportList | undefined };

     function itemID(item: SupportItem): number {
        return data?.support.indexOf(item) || 0;
    }
</script>

<template>
    <h2 class="text-2xl font-bold mb-2">Support</h2>
    <div v-if="data" class="flex flex-row flex-wrap justify-between gap-8">
        <div v-for="item in data?.support" :key="itemID(item)" class="flex-1 flex flex-col md:min-w-75 max-w-75">
            <div class="mx-auto">
                <img :src="item.image.thumbnail" :alt="item.image.alt">
            </div>
            <h3 class="text-xl font-semibold">{{ item.title }}</h3>
            <div v-html="item.content"></div>
        </div>
    </div>
</template>

<style scoped></style>