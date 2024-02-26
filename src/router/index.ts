import { createRouter, createWebHistory } from 'vue-router'
import Kanban from '../pages/Kanban.vue'
import KanbanV2 from '../pages/KanbanV2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Kanban',
      component: Kanban
    },
    {
      path: '/kanban',
      name: 'KanbanV2',
      component: KanbanV2
    },
  ]
})

export default router
