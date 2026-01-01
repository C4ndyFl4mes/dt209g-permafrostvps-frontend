<script setup lang="ts">
import type { TierSet } from '@/interfaces/TierSet';

function alertTier(tierTitle: string) {
    alert(`You have selected the ${tierTitle} tier. Thank you for your choice! Didn't have time to implement actual "purchase" flow.`);
}

const { data } = defineProps<{
    data: Object | undefined;
}>() as { data: TierSet | undefined };
</script>

<template>
    <h2 class="text-2xl font-bold mb-2">Subscription Tiers</h2>
    <div v-if="data" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        <div v-for="tier in data?.tierset" :key="tier.id"
            class="border rounded-lg p-4 flex-1 md:min-w-75 shadow-md flex flex-col h-full">
            <h3 class="text-xl font-semibold mb-2">{{ tier.title }}</h3>
            <p class="text-2xl font-bold mb-4">{{ tier.monthly_cost }}</p>
            <ul class="mb-4">
                <li>vCPU: {{ tier.vcpu }}</li>
                <li>RAM: {{ tier.ram_gb }} GB</li>
                <li>Storage: {{ tier.storage_gb }} GB</li>
                <li>Storage Type: {{ tier.storage_type }}</li>
                <li>Bandwidth: {{ tier.bandwidth_tb }} TB</li>
            </ul>
            <p class="mb-4">{{ tier.info }}</p>
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer mt-auto"
                @click="alertTier(tier.title)">
                Select {{ tier.title }}
            </button>
        </div>
    </div>
    <div v-else class="mb-5">
        <p>No tier data available.</p>
    </div>
</template>

<style scoped></style>