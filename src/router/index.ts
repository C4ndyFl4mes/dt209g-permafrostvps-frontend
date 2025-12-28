import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:slug',
      component: () => import('@/components/views/Page.vue'),
    },
  ]
});

export default router;
