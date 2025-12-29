<script setup lang="ts">
import type { BannerImage } from '@/interfaces/BannerImage';

const { data } = defineProps<{
    data: Object | undefined;
}>() as { data: BannerImage | undefined };
</script>

<template>
    <div class="mx-auto rounded-2xl overflow-hidden">
        <picture v-if="data && data!.banner_image.large.url != '' && data!.banner_image.small.url != ''">
            <source :srcset="data.banner_image.large.url" media="(min-width: 1024px)"
                :sizes="`${data.banner_image.large.width}px, ${data.banner_image.large.height}px`" />
            <source :srcset="data.banner_image.small.url" media="(max-width: 1023px)"
                :sizes="`${data.banner_image.small.width}px, ${data.banner_image.small.height}px`" />
            <img :alt="data.banner_image.alt" :src="data.banner_image.small.url"
                :sizes="`(min-width: 1024px) ${data.banner_image.large.width}px, ${data.banner_image.small.width}px`" />
        </picture>
        <div v-else>
            <p>No banner data available.</p>
        </div>
    </div>
</template>

<style scoped></style>