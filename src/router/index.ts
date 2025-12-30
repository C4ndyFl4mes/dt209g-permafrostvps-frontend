import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:slug',
      component: () => import('@/components/views/Page.vue'),
    },
    {
      path: '/news/:newsslug',
      component: () => import('@/components/views/SingleNewsPage.vue'),
    },
    {
      path: '/login',
      component: () => import('@/components/views/Login.vue'),
    }
  ]
});

export default router;
