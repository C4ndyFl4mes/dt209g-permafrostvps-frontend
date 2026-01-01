import { createRouter, createWebHistory } from 'vue-router';
// import { useSiteConfigStore } from '@/stores/siteConfig';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/:slug',
      component: () => import('@/components/views/Page.vue'),
    },
    {
      path: '/news/:newsslug',
      component: () => import('@/components/views/SingleNewsPage.vue'),
    }
  ]
});

export default router;
