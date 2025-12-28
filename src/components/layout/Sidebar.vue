<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { WPEditor } from '@/services/WPEditor';
import type { MenuItem } from '@/interfaces/MenuItem';

const menuItems = ref<MenuItem[]>([]);

// Hämta menyobjekt när komponenten monteras
onMounted(async () => {
    menuItems.value = await WPEditor.getMenuItems('sidebar-menu');
});

/**
 * Beräknar djupet för ett menyobjekt baserat på dess föräldrar.
 * @param item - Menyobjektet vars djup ska beräknas.
 * @returns - Djupet för menyobjektet.
 */
function getDepth(item: MenuItem): number {
    let depth = 0;
    let currentItem = item;
    while (currentItem.parent_id !== 0) {
        const parentItem = menuItems.value.find(mi => mi.id === currentItem.parent_id);
        if (parentItem) {
            depth++;
            currentItem = parentItem;
        } else {
            break;
        }
    }
    return depth;
}
</script>


<template>
    <aside class="bg-red-300 p-2">
        <nav>
            <ul>
                <li v-for="item in menuItems" :key="item.id" class="p-2" :style="{ marginLeft: `${getDepth(item)*0.75}rem`}">
                   <RouterLink :to="`/${item.slug}`">{{ item.title }}</RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>