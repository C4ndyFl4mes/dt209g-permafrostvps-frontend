import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SiteConfig } from '@/interfaces/SiteConfig';
import { WPEditor } from '@/services/WPEditor';

/**
 * Pinia store för hantering av webbplatsens konfigurationsinställningar.
 */
export const useSiteConfigStore = defineStore('siteConfig', () => {
    const config = ref<SiteConfig | null>(null);

    async function fetchSiteConfig() {
        config.value = await WPEditor.getSiteConfig();
    }

    return { config, fetchSiteConfig };
});