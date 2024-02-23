import { createRouter, createWebHistory } from 'vue-router'
import Kanban from '../pages/Kanban.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Kanban',
      component: Kanban
    },
  ]
})

export default router
