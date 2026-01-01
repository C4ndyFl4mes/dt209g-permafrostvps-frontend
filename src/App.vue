<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useSiteConfigStore } from '@/stores/siteConfig';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

const siteConfigStore = useSiteConfigStore();
let state = ref(true);

// Hämta webbplatskonfiguration och användarprofil vid montering
onMounted(async () => {
  await siteConfigStore.fetchSiteConfig();
  
  // Stäng sidofältet på mobila enheter vid initial laddning
  if (window.innerWidth < 1024) {
    state.value = false;
  }
  
  // Lägg till resize-lyssnare för att stänga sidofältet på mobila enheter
  window.addEventListener('resize', handleResize);
});

/**
 * Stänger sidofältet på mobila enheter vid ändring av fönsterstorlek.
 */
function handleResize() {
  if (window.innerWidth < 1024) {
    state.value = false;
  }
}

/**
 * Övervakar ändringar i favicon-URL och uppdaterar dokumentets favicon.
 */
watch(() => siteConfigStore.config?.seo_settings.favicon?.url, (faviconUrl) => {
  if (faviconUrl) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0]?.appendChild(link);
    }
    link.href = faviconUrl;
  }
}, { immediate: true });
</script>

<template>
  <div class="page-wrapper">
    <Header class="header"
      :style="{ backgroundColor: '#f1f5f9', color: '#1e293b' }" />
    <div :style="{ backgroundColor: '#f1f5f9' }" class="w-full py-2">
      <div :class="[
        'flex',
        'w-64',
        siteConfigStore.config && siteConfigStore.config.layout_settings.sidebar_position === 'right' ? 'ml-auto' : 'mr-auto'
      ]">
        <div class="flex w-full justify-center h-full items-center">
          <button @click="state = !state"
            class="w-[75%] py-1 rounded hover:brightness-95 text-base font-medium transition-colors duration-200 cursor-pointer"
            :style="{ backgroundColor: '#3b82f6', color: '#ffffff' }">
            {{ state ? 'Hide' : 'Show' }} Menu
          </button>
        </div>
      </div>
    </div>
    <div :class="[
      'flex-layout',
      siteConfigStore.config && siteConfigStore.config.layout_settings.sidebar_position === 'right' ? 'flex-reverse' : '',
      !state ? 'closed' : ''
    ]">
      <Sidebar class="sidebar z-10"
        :style="{ backgroundColor: '#f1f5f9', color: '#1e293b' }" />
      <div class="main">
        <router-view />
      </div>
    </div>
    <Footer class="footer"
      :style="{ backgroundColor: '#f1f5f9', color: '#1e293b' }" />
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.flex-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1 1 auto;
}

.flex-reverse {
  flex-direction: row-reverse;
}

.sidebar {
  overflow: hidden;
  width: 16rem;
  min-width: 0;
  transition: width 0.5s cubic-bezier(.4, 0, .2, 1);
}

.closed .sidebar {
  width: 0;
}

.main {
  flex: 1 1 0%;
  min-width: 0;
  transition: none;
}
</style>
