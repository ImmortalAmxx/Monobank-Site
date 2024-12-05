import { createRouter, createWebHistory } from 'vue-router';
import AuthorizationPage from '../views/AuthorizationPage.vue';
import MainPage from '../views/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'Authorization',
    component: AuthorizationPage,
  },
  {
    path: '/main',
    name: 'Main',
    component: MainPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
